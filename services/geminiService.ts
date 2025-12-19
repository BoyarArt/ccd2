import { GoogleGenAI, GenerateContentResponse, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODEL_NAME = 'gemini-3-pro-preview';

export const sendChatMessage = async (
  message: string, 
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    const systemInstruction = `
      Вы — эксперт-консультант по цифровой доступности и стандартам WCAG 2.2 и СТ РК 2191‑2023. 
      Ваша целевая аудитория — представители государственных органов Казахстана.
      
      Ваши задачи:
      1. Отвечать на вопросы о внедрении стандартов доступности.
      2. Объяснять технические требования (POUR: Воспринимаемость, Управляемость, Понятность, Надёжность).
      3. Рассказывать о сроках (полное внедрение до конца 2026 года) и ответственности.
      4. Быть вежливым, профессиональным и убедительным.
      
      Используйте информацию:
      - СТ РК 2191‑2023 гармонизирован с WCAG 2.2.
      - Более 1 млрд людей в мире живут с инвалидностью.
      - Казахстан ратифицировал Конвенцию ООН.
      - Уровень соответствия для госсайтов обычно AA.
    `;

    const contents = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Add current message
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      config: {
        systemInstruction: systemInstruction,
      },
      contents: contents,
    });

    return response.text || "Извините, я не смог сгенерировать ответ. Попробуйте еще раз.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Произошла ошибка при обращении к сервису консультаций.";
  }
};

export const analyzeAccessibilityImage = async (base64Image: string): Promise<string> => {
  try {
    const prompt = `
      Проанализируй это изображение (скриншот веб-сайта или интерфейса) на предмет соответствия базовым принципам доступности WCAG 2.2 и СТ РК 2191‑2023.
      
      Укажи:
      1. Проблемы с контрастностью (если есть).
      2. Читаемость текста.
      3. Наличие визуального шума или перегрузки.
      4. Предполагаемые проблемы для скринридеров (на основе визуальной структуры).
      
      Ответ дай в формате краткого, структурированного отчета на русском языке.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            text: prompt
          },
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming JPEG/PNG, API handles generic types well
              data: base64Image
            }
          }
        ]
      }
    });

    return response.text || "Не удалось проанализировать изображение.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Ошибка анализа изображения. Пожалуйста, убедитесь, что вы загрузили корректный файл.";
  }
};

export const analyzeWebsite = async (url: string): Promise<AnalysisResult> => {
  try {
    const prompt = `
      Выполните аудит веб-сайта "${url}" на соответствие стандартам WCAG 2.2 уровня AA и СТ РК 2191‑2023.
      
      Так как прямой доступ к коду ограничен, выполните эвристический анализ, основываясь на вашем знании о типичных проблемах доступности для сайтов такого типа (государственные порталы, корпоративные сайты и т.д.) или используя публично доступную информацию об этом ресурсе.
      
      Сгенерируйте реалистичный отчет, включающий:
      1. Общий балл доступности (от 0 до 100).
      2. Список конкретных ошибок (Errors), критичных для уровня AA.
      3. Список предупреждений (Warnings).
      4. Список успешных критериев (Passes), которые сайт, вероятно, соблюдает.
      5. Краткое резюме (summary) на русском языке.

      Будьте строги, но справедливы. Учитывайте контрастность, навигацию с клавиатуры, alt-тексты, ARIA-атрибуты и семантику.
    `;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "Общий балл доступности от 0 до 100" },
        errors: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "Список нарушений стандартов WCAG 2.2 AA"
        },
        warnings: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "Рекомендации по улучшению"
        },
        passes: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "Успешно пройденные критерии"
        },
        summary: { type: Type.STRING, description: "Краткое текстовое резюме аудита" }
      },
      required: ["score", "errors", "warnings", "passes", "summary"]
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }
    
    throw new Error("Empty response");
  } catch (error) {
    console.error("Website Analysis Error:", error);
    return {
      score: 0,
      errors: ["Не удалось выполнить анализ. Проверьте правильность URL."],
      warnings: [],
      passes: [],
      summary: "Произошла ошибка при соединении с сервером аналитики."
    };
  }
};
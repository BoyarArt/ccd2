import React, { useState } from 'react';
import { analyzeAccessibilityImage } from '../services/geminiService';

export const ImageAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix for API if present, though Gemini SDK often handles it or we strip it
        // The previous implementation assumed sending base64 data directly.
        // Let's keep the full string for display, strip for API.
        setSelectedImage(base64String);
        setAnalysisResult('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      // Extract base64 data part
      const base64Data = selectedImage.split(',')[1];
      const result = await analyzeAccessibilityImage(base64Data);
      setAnalysisResult(result);
    } catch (error) {
      setAnalysisResult('Ошибка анализа изображения.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Экспресс-анализ доступности</h3>
      <p className="text-gray-600 mb-6">
        Загрузите скриншот вашего текущего сайта, чтобы получить предварительную оценку на соответствие визуальным требованиям WCAG с помощью ИИ.
      </p>

      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            {selectedImage ? (
              <img src={selectedImage} alt="Preview" className="h-full object-contain p-2" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Нажмите для загрузки</span> или перетащите файл</p>
                <p className="text-xs text-gray-500">PNG, JPG (макс. 5MB)</p>
              </div>
            )}
            <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        {selectedImage && (
          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Анализ...
                </>
              ) : (
                'Проверить с помощью Gemini'
              )}
            </button>
          </div>
        )}

        {analysisResult && (
          <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="text-lg font-bold text-blue-900 mb-3">Результат анализа:</h4>
            <div className="prose prose-blue text-gray-800 whitespace-pre-line text-sm md:text-base">
              {analysisResult}
            </div>
            <p className="mt-4 text-xs text-gray-500 italic">
              * Примечание: Это автоматический анализ ИИ. Для полного аудита требуется проверка специалистом и техническими инструментами.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
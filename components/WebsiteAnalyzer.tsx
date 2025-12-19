import React, { useState } from 'react';
import { analyzeWebsite } from '../services/geminiService';
import { AnalysisResult } from '../types';

export const WebsiteAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    setResult(null);
    try {
      const data = await analyzeWebsite(url);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Соответствует';
    return 'Не соответствует';
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 transition-all">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Экспресс-аудит сайта (WCAG 2.2)</h3>
      <p className="text-gray-600 mb-6">
        Введите адрес вашего веб-ресурса для автоматической проверки на соответствие стандартам СТ РК 2191‑2023 и WCAG 2.2 (уровень AA).
      </p>

      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Введите адрес сайта (например: egov.kz)"
          className="flex-1 bg-green-50 text-black border border-green-200 rounded-xl px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder:text-gray-500"
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
        />
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !url}
          className="bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl active:scale-95 transform duration-150 flex items-center justify-center min-w-[160px]"
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Анализ...
            </>
          ) : (
            'Анализ'
          )}
        </button>
      </div>

      {result && (
        <div className="animate-fade-in-up">
          {/* Summary Header */}
          <div className={`p-6 rounded-xl border-l-4 mb-8 flex flex-col md:flex-row gap-6 items-center ${getScoreColor(result.score)}`}>
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
                <circle
                  className="text-current transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={365}
                  strokeDashoffset={365 - (365 * result.score) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-current">
                <span className="text-4xl font-extrabold">{result.score}</span>
                <span className="text-[10px] font-bold uppercase tracking-tight text-center px-2 leading-none">{getScoreLabel(result.score)}</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-2 text-gray-900">Результат аудита</h4>
              <p className="text-gray-700 leading-relaxed">{result.summary}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Errors */}
            <div className="bg-red-50 rounded-xl p-5 border border-red-100">
              <div className="flex items-center gap-2 mb-4 text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <h5 className="font-bold uppercase tracking-wide text-sm">Ошибки (Errors)</h5>
              </div>
              <ul className="space-y-3">
                {result.errors.length > 0 ? (
                  result.errors.map((err, idx) => (
                    <li key={idx} className="text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm border border-red-100 flex gap-2 items-start">
                      <span className="text-red-500 mt-0.5">•</span>
                      {err}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500 italic">Критичных ошибок не обнаружено.</li>
                )}
              </ul>
            </div>

            {/* Warnings */}
            <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
              <div className="flex items-center gap-2 mb-4 text-orange-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                <h5 className="font-bold uppercase tracking-wide text-sm">Предупреждения</h5>
              </div>
              <ul className="space-y-3">
                {result.warnings.length > 0 ? (
                  result.warnings.map((warn, idx) => (
                    <li key={idx} className="text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm border border-orange-100 flex gap-2 items-start">
                      <span className="text-orange-500 mt-0.5">•</span>
                      {warn}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500 italic">Предупреждений нет.</li>
                )}
              </ul>
            </div>

            {/* Passes */}
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <div className="flex items-center gap-2 mb-4 text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <h5 className="font-bold uppercase tracking-wide text-sm">Соответствие</h5>
              </div>
              <ul className="space-y-3">
                {result.passes.length > 0 ? (
                  result.passes.map((pass, idx) => (
                    <li key={idx} className="text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm border border-green-100 flex gap-2 items-start">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {pass}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500 italic">Нет данных о пройденных тестах.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
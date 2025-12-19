import React from 'react';
import { ChatBot } from './components/ChatBot';
import { WebsiteAnalyzer } from './components/WebsiteAnalyzer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      
      {/* --- Navigation --- */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">Ц</div>
              <span className="font-bold text-xl tracking-tight text-blue-900">Центр Цифровой Доступности</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#standards" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Стандарты</a>
              <a href="#principles" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Принципы</a>
              <a href="#timeline" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Сроки</a>
              <a href="#audit" className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">Заказать аудит</a>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header id="home" className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-sm font-medium mb-6">
          <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
          СТ РК 2191‑2023 уже в силе
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
          Цифровая доступность <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
            для каждого гражданина
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Адаптация государственных интернет-ресурсов в соответствии с WCAG 2.2 и национальным стандартом СТ РК 2191‑2023. Обеспечьте равный доступ к услугам до 2027 года.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#standards" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl text-lg font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all">
            Узнать о стандартах
          </a>
        </div>
      </header>

      {/* --- Standards Info --- */}
      <section id="standards" className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Два ключевых стандарта</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">WCAG 2.2</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Международное руководство (Web Content Accessibility Guidelines) от W3C. Задаёт универсальные принципы для того, чтобы контент был доступен всем пользователям, независимо от их физических возможностей.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">СТ РК 2191‑2023</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Национальный стандарт Республики Казахстан. Разработан на основе WCAG 2.2. Устанавливает жесткие требования к государственным ресурсам для обеспечения доступа граждан с нарушениями зрения, слуха, моторики и когнитивными особенностями.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-bold mb-4">Почему это важно?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs">✓</span>
                  <span className="text-slate-700"><strong className="text-slate-900">Социально:</strong> Доступ для 15% населения мира с инвалидностью и пожилых людей.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs">✓</span>
                  <span className="text-slate-700"><strong className="text-slate-900">Юридически:</strong> Обязательства по Конвенции ООН и законодательству РК. Избежание санкций.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs">✓</span>
                  <span className="text-slate-700"><strong className="text-slate-900">Технологически:</strong> Доступный код — это качественный, чистый код, улучшающий SEO и кроссплатформенность.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- POUR Principles --- */}
      <section id="principles" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">4 Принципа Доступности (POUR)</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Фундамент, на котором строятся стандарты WCAG и СТ РК.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Воспринимаемость', en: 'Perceivable', desc: 'Информация не должна быть невидимой для органов чувств. Пример: Alt-текст для картинок, субтитры для видео.', icon: '👁️' },
            { title: 'Управляемость', en: 'Operable', desc: 'Интерфейсом можно управлять любым способом. Пример: Полная навигация с клавиатуры, без мыши.', icon: '⌨️' },
            { title: 'Понятность', en: 'Understandable', desc: 'Информация и операции должны быть понятны. Пример: Предсказуемая навигация, простой язык.', icon: '🧠' },
            { title: 'Надёжность', en: 'Robust', desc: 'Совместимость с текущими и будущими технологиями, включая ассистивные средства (скринридеры).', icon: '🛡️' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
              <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold mb-3">{item.en}</p>
              <p className="text-slate-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Timeline Section --- */}
      <section id="timeline" className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Дорожная карта внедрения</h2>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Казахстан активно внедряет международные стандарты. Государственным органам установлен переходный период до конца 2026 года для полного соответствия.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-16 font-bold text-blue-300">2024</div>
                  <div>
                    <h4 className="font-bold">Вступление в силу</h4>
                    <p className="text-sm text-blue-200">СТ РК 2191‑2023 действует с 1 января. Начало аудитов.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 font-bold text-blue-300">2025</div>
                  <div>
                    <h4 className="font-bold">Активная адаптация</h4>
                    <p className="text-sm text-blue-200">Унификация структуры сайтов, внедрение обязательных норм.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 font-bold text-white text-lg">2026</div>
                  <div>
                    <h4 className="font-bold text-lg">Дедлайн</h4>
                    <p className="text-sm text-blue-200">Полное приведение ресурсов в соответствие стандарту.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 font-bold text-blue-300">2027</div>
                  <div>
                    <h4 className="font-bold">Целевое состояние</h4>
                    <p className="text-sm text-blue-200">Государственные сайты РК полностью инклюзивны.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-800 p-8 rounded-2xl border border-blue-700">
              <h3 className="text-xl font-bold mb-4">Не откладывайте на последний момент</h3>
              <p className="text-blue-200 mb-6 text-sm">
                Мировой опыт показывает: ранняя интеграция accessibility экономит бюджет. Исправление готовых систем перед дедлайном стоит в разы дороже.
              </p>
              <blockquote className="italic text-blue-100 border-l-4 border-blue-500 pl-4 mb-6">
                "Реализация стандартов — это не только требование закона, но и шаг к созданию по-настоящему инклюзивного цифрового пространства."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* --- Website Analyzer Feature --- */}
      <section id="analyzer" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Технологии ИИ</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">Проверьте доступность прямо сейчас</h2>
          <p className="text-slate-600 mt-4">Введите адрес сайта для эмуляции проверки доступности на соответствие WCAG 2.2 и СТ РК 2191‑2023.</p>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <WebsiteAnalyzer />
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-700 rounded text-white flex items-center justify-center font-bold text-xs">Ц</div>
                <span className="font-bold text-lg text-slate-900">Центр Цифровой Доступности</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Профессиональная адаптация государственных веб-ресурсов под стандарты WCAG 2.2 и СТ РК 2191‑2023. Делаем интернет доступным для всех граждан Казахстана.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Стандарты</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-blue-700">WCAG 2.2</a></li>
                <li><a href="#" className="hover:text-blue-700">СТ РК 2191‑2023</a></li>
                <li><a href="#" className="hover:text-blue-700">Конвенция ООН</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Almaty, Kazakhstan</li>
                <li>info@ccd.kz</li>
                <li>+7 (777) 000-00-00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>&copy; 2025 Центр Цифровой Доступности. Все права защищены.</p>
            <p>Сайт разработан с учетом требований доступности.</p>
          </div>
        </div>
      </footer>

      {/* --- Chatbot Floating Button --- */}
      <ChatBot />

    </div>
  );
};

export default App;
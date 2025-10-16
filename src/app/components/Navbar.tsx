import { Language, translations } from '../translations';

interface NavbarProps {
  activeSection: string;
  language: Language;
  onLanguageToggle: () => void;
}

export default function Navbar({ activeSection, language, onLanguageToggle }: NavbarProps) {
  const t = translations[language];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0f]/80 border-b border-cyan-500/20">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold gradient-text">
            PORTFOLIO
          </div>
          
          <ul className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', label: t.nav.home },
              { id: 'about', label: t.nav.about },
              { id: 'skills', label: t.nav.skills },
              { id: 'projects', label: t.nav.projects },
              { id: 'contact', label: t.nav.contact }
            ].map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`font-mono text-sm transition-all duration-300 hover:text-cyan-400 ${
                    activeSection === item.id 
                      ? 'text-cyan-400 glow-subtle' 
                      : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <button
              onClick={onLanguageToggle}
              className="px-3 py-1.5 font-mono text-sm border border-cyan-500/30 text-cyan-400 rounded
                       hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 
                       hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] shadow-[0_0_10px_rgba(0,255,255,0.2)]"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden text-cyan-400 text-2xl">☰</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

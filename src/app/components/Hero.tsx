import { Language, translations } from '../translations';

interface HeroProps {
  language: Language;
}

export default function Hero({ language }: HeroProps) {
  const t = translations[language];

  return (
    <header id="home" className="mb-20 animate-on-scroll">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-1 h-16 bg-gradient-to-b from-cyan-400 to-purple-600 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.6)]" />
        <div>
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-2">
            {t.hero.name}
          </h1>
          <p className="text-xl md:text-2xl text-cyan-400 font-mono neon-glow-cyan">
            {'>'} {t.hero.role}
          </p>
        </div>
      </div>
      
      <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
        {t.hero.description}
      </p>
    </header>
  );
}

import { Language, translations } from '../translations';

interface AboutProps {
  language: Language;
}

export default function About({ language }: AboutProps) {
  const t = translations[language];

  return (
    <section id="about" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 flex items-center gap-3 animate-fade-left neon-glow-cyan">
        <span className="text-magenta-500 font-mono">{'<'}</span>
        {t.about.title}
        <span className="text-magenta-500 font-mono">{'/>'}</span>
      </h2>
      
      <div className="cyber-card rounded-lg p-6 md:p-8 animate-fade-right">
        <p className="text-gray-300 leading-relaxed mb-4">
          {t.about.text1}
        </p>
        <p className="text-gray-300 leading-relaxed">
          {t.about.text2}
        </p>
      </div>
    </section>
  );
}

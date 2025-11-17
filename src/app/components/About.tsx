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
      
      <div className="cyber-card rounded-lg p-8 md:p-10 animate-fade-right relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-magenta-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 via-magenta-500 to-cyan-400 opacity-50" />
        
        <div className="relative space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {t.about.text1}
            </p>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 rounded-full bg-magenta-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-mono mb-3 uppercase tracking-wider">
                Stack Technique
              </p>
              <p className="text-gray-300 leading-relaxed">
                {t.about.text2}
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-400/20 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-magenta-500/20 rounded-bl-lg" />
      </div>
    </section>
  );
}
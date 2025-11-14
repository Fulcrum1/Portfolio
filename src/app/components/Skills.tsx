import { Language, translations } from '../translations';

interface SkillsProps {
  language: Language;
}

export default function Skills({ language }: SkillsProps) {
  const t = translations[language];
  const accentColors = ['', 'accent-cyan', '', 'accent-purple', '', 'accent-magenta'];

  return (
    <section id="skills" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 flex items-center gap-3 animate-fade-left neon-glow-cyan">
        <span className="text-magenta-500 font-mono">{'<'}</span>
        {t.skills.title}
        <span className="text-magenta-500 font-mono">{'/>'}</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {t.skills.items.map((item, idx) => (
          <div 
            key={idx} 
            className={`cyber-card rounded-lg p-5 animate-scale ${accentColors[idx % accentColors.length]}`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <h3 className="text-purple-400 font-bold mb-3 text-lg font-mono">
              {`// ${item.category}`}
            </h3>
            <ul className="space-y-2">
              {item.skills.map((skill, i) => (
                <li key={i} className="text-gray-300 flex items-center gap-2">
                  <span className="text-cyan-400">▹</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

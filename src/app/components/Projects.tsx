import { Language, translations } from '../translations';

interface ProjectsProps {
  language: Language;
}

export default function Projects({ language }: ProjectsProps) {
  const t = translations[language];
  
  const tagColors = [
    'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    'bg-purple-500/10 border-purple-500/30 text-purple-400',
  ];

  return (
    <section id="projects" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 flex items-center gap-3 animate-fade-left neon-glow-cyan">
        <span className="text-magenta-500 font-mono">{'<'}</span>
        {t.projects.title}
        <span className="text-magenta-500 font-mono">{'/>'}</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.projects.items.map((project, idx) => (
          <div 
            key={idx} 
            className="cyber-card rounded-lg p-6 group cursor-pointer animate-on-scroll hover:scale-[1.02] transition-all"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-3 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className={`px-3 py-1 text-sm font-mono border rounded ${tagColors[i % tagColors.length]}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

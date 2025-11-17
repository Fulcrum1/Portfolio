import { Language, translations } from "../translations";

interface ProjectsProps {
  language: Language;
}

export default function Projects({ language }: ProjectsProps) {
  const t = translations[language];

  const tagColors = [
    "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    "bg-purple-500/10 border-purple-500/30 text-purple-400",
  ];

  return (
    <section id="projects" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 flex items-center gap-3 animate-fade-left neon-glow-cyan">
        <span className="text-magenta-500 font-mono">{"<"}</span>
        {t.projects.title}
        <span className="text-magenta-500 font-mono">{"/>"}</span>
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
                  className={`px-3 py-1 text-sm font-mono border rounded ${
                    tagColors[i % tagColors.length]
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.github && (
              <div className="flex justify-end mt-3 text-white">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex gap-2 items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  aria-label={`Voir le dépôt GitHub du projet ${
                    project.title || ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

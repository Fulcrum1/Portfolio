import { Language, translations } from '../translations';

interface ContactProps {
  language: Language;
}

export default function Contact({ language }: ContactProps) {
  const t = translations[language];

  return (
    <section id="contact" className="mb-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 flex items-center gap-3 animate-fade-left neon-glow-cyan">
        <span className="text-magenta-500 font-mono">{'<'}</span>
        {t.contact.title}
        <span className="text-magenta-500 font-mono">{'/>'}</span>
      </h2>
      
      <div className="cyber-card rounded-lg p-8 animate-fade-right">
        <p className="text-gray-300 mb-6 text-lg">
          {t.contact.text}
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="mailto:guillaume.trapet21@gmail.com"
            className="px-6 py-3 border-2 border-purple-500 text-purple-400 font-bold rounded-lg 
                     hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(189,0,255,0.3)] transition-all duration-300"
          >
            {t.contact.email}
          </a>
          <a 
            href="https://github.com/Fulcrum1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg 
                     hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
          >
            {t.contact.github}
          </a>
          <a 
            href="https://www.linkedin.com/in/guillaume-trapet-831023207"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-purple-500 text-purple-400 font-bold rounded-lg 
                     hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(189,0,255,0.3)] transition-all duration-300"
          >
            {t.contact.linkedin}
          </a>
          <a 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg 
                     hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300 cursor-pointer"
            onClick={() => window.open('https://guillaumetrapet.com/Resume.pdf', '_blank')}
          >
            {t.contact.resume}
          </a>
        </div>
      </div>
    </section>
  );
}

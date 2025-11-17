import { Language, translations } from "../translations";
import Title from "./Global/title";
interface ContactProps {
  language: Language;
}

export default function Contact({ language }: ContactProps) {
  const t = translations[language];

  return (
    <section id="contact" className="mb-20 scroll-mt-24">
      <Title>{t.contact.title}</Title>
      <div className="card rounded-lg p-8 animate-fade-right">
        <p className="text-gray-300 mb-6 text-lg">{t.contact.text}</p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:guillaume.trapet21@gmail.com"
            // className="px-6 py-3 border-2 border-purple-500 text-purple-400 font-bold rounded-lg 
            //          hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(189,0,255,0.3)] transition-all duration-300"
            className="px-6 py-3 border-2 font-bold rounded-lg contact-main-link"
          >
            {t.contact.email}
          </a>
          <a
            href="https://github.com/Fulcrum1"
            target="_blank"
            rel="noopener noreferrer"
            // className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg 
            //          hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
            className="px-6 py-3 border-2 font-bold rounded-lg contact-secondary-link"
          >
            {t.contact.github}
          </a>
          <a
            href="https://www.linkedin.com/in/guillaume-trapet-831023207"
            target="_blank"
            rel="noopener noreferrer"
            // className="px-6 py-3 border-2 border-purple-500 text-purple-400 font-bold rounded-lg 
            //          hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(189,0,255,0.3)] transition-all duration-300"
            className="px-6 py-3 border-2 font-bold rounded-lg contact-main-link"
          >
            {t.contact.linkedin}
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            // className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg 
            //          hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300 cursor-pointer"
            className="px-6 py-3 border-2 font-bold rounded-lg contact-secondary-link"
            onClick={() =>
              window.open(
                `https://guillaumetrapet.com/Resume/${language}/Resume.pdf`,
                "_blank"
              )
            }
          >
            {t.contact.resume}
          </a>
        </div>
      </div>
    </section>
  );
}

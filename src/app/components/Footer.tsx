import { Language, translations } from '../translations';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="text-center text-gray-500 font-mono text-sm mt-20">
      <div className="border-t border-cyan-900/30 pt-8 animate-on-scroll">
        <p className="mb-2">© {new Date().getFullYear()} - {t.footer.rights}</p>
        <p className="text-cyan-400/50">{t.footer.built}</p>
      </div>
    </footer>
  );
}

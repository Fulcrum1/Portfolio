import { Language, translations } from "@/lib/translations";

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="text-center text-gray-500 font-mono text-sm mt-20">
      <div className="border-t border-main-color pt-8 animate-on-scroll">
        <p className="mb-2">© {new Date().getFullYear()} - {t.home.footer.rights}</p>
        <p className="main-color">{t.home.footer.built}</p>
      </div>
    </footer>
  );
}

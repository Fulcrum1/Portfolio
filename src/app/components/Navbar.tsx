"use client";
import { Language, translations } from "../translations";
import { useState } from "react";

interface NavbarProps {
  activeSection: string;
  language: Language;
  onLanguageToggle: () => void;
}

export default function Navbar({
  activeSection,
  language,
  onLanguageToggle,
}: NavbarProps) {
  const t = translations[language];
  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "contact", label: t.nav.contact },
  ];
  const [current, setCurrent] = useState<string | null>("home");

  return (
    <div className="relative">
      <nav
        className={`z-1 rounded-full fixed top-4 left-1/2 transform -translate-x-1/2 flex justify-center backdrop-blur-md bg-white/10 border border-white/20 shadow-lg w-full mx-auto ${
          language === "fr" ? "sm:w-145" : "sm:w-124"
        }`}
      >
        <div className="w-full px-4 py-2">
          <div className="flex items-center justify-center">
            <ul className="flex items-center gap-4 md:gap-8 flex-wrap justify-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setCurrent(item.id)}
                    className={`font-mono text-xs md:text-sm transition-all duration-300 hover:text-cyan-400 px-2 py-1 ${
                      current === item.id
                        ? "text-cyan-400 glow-subtle"
                        : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={onLanguageToggle}
          className="px-2 py-1 md:px-3 md:py-1.5 font-mono text-xs md:text-sm border border-cyan-500/30 text-cyan-400 rounded hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] shadow-[0_0_10px_rgba(0,255,255,0.2)]"
        >
          {language === "fr" ? "EN" : "FR"}
        </button>
      </div>
    </div>
  );
}

"use client";
import { Language, translations } from "../translations";
import { useState } from "react";
import { Paintbrush } from "lucide-react";
import { useTheme } from "./ThemeProvider";

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
      <div className="hidden sm:block fixed top-4 left-4 z-50">
        <ThemeButton />
      </div>
      <nav
        className={`z-1 rounded-full fixed top-4 left-1/2 transform -translate-x-1/2 flex justify-center backdrop-blur-md navbar-bg border navbar-border shadow-lg w-full mx-auto ${
          language === "fr" ? "sm:w-145" : "sm:w-124"
        }`}
      >
        <div className="w-full px-4 py-2">
          <div className="flex items-start justify-center gap-2">
            <div className="block sm:hidden">
              <ThemeButton />
            </div>
            <ul className="flex items-center gap-4 md:gap-8 flex-wrap justify-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setCurrent(item.id)}
                    className={`font-mono text-xs md:text-sm transition-all duration-300 px-2 py-1 ${
                      current === item.id ? "main-color glow-subtle" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="block sm:hidden">
              <LanguageButton
                language={language}
                onLanguageToggle={onLanguageToggle}
              />
            </div>
            {/* <ul className="flex items-center gap-4 md:gap-8 flex-wrap justify-center">
              <li className="block sm:hidden">
                <ThemeButton />
              </li>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setCurrent(item.id)}
                    className={`font-mono text-xs md:text-sm transition-all duration-300 px-2 py-1 ${
                      current === item.id ? "main-color glow-subtle" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="block sm:hidden">
                <LanguageButton
                  language={language}
                  onLanguageToggle={onLanguageToggle}
                />
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
      <div className="hidden sm:block fixed top-4 right-4 z-50">
        <LanguageButton
          language={language}
          onLanguageToggle={onLanguageToggle}
        />
      </div>
    </div>
  );
}

export function ThemeButton() {
  const { toggleTheme } = useTheme();

  return <Paintbrush onClick={toggleTheme} />;
}

export function LanguageButton({
  language,
  onLanguageToggle,
}: {
  language: Language;
  onLanguageToggle: () => void;
}) {
  return (
    <button
      onClick={onLanguageToggle}
      className="px-2 py-1 md:px-3 md:py-1.5 font-mono text-xs md:text-sm border language-button-border language-button-text rounded transition-all duration-300 cursor-pointer"
    >
      {language === "fr" ? "EN" : "FR"}
    </button>
  );
}

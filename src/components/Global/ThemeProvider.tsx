"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "modern",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("modern");

  // Charger le thème sauvegardé
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  // Charger dynamiquement le fichier CSS
  useEffect(() => {
    // Supprimer éventuel ancien <link>
    const existing = document.getElementById("theme-style");
    if (existing) existing.remove();

    // Créer un nouveau <link>
    const link = document.createElement("link");
    link.id = "theme-style";
    link.rel = "stylesheet";

    link.href = theme === "cyberpunk" ? "/cyberpunk.css" : "/modern.css";

    document.head.appendChild(link);

    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "modern" ? "cyberpunk" : "modern"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

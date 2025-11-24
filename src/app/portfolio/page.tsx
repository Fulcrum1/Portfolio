"use client";
import Experiences from "@/components/Portfolio/Experiences";
import Projects from "@/components/Portfolio/Projects";
import Skills from "@/components/Portfolio/Skills";
import Education from "@/components/Portfolio/Education";

import { useLanguage } from "@/components/Global/Navbar";

export default function Portfolio() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-4">
      <Experiences language={language} />
      <Education language={language} />
      <Projects language={language} />
      <Skills language={language} />
    </div>
  );
}

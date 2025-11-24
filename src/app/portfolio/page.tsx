"use client";
import Experiences from "@/components/Portfolio/Experiences";
import Projects from "@/components/Portfolio/Projects";
import Skills from "@/components/Portfolio/Skills";
import Education from "@/components/Portfolio/Education";

import { useLanguage } from "@/components/Global/Navbar";
import { translations } from "@/lib/translations";

import { Experience, Formation, Project, Skill } from "@/lib/Interface/portfolio-type";

export default function Portfolio() {
  const { language } = useLanguage();
  const t = translations[language];

  const experiences = t.portfolio.experiences as unknown as Experience[];
  const formations = t.portfolio.formations as unknown as Formation[];
  const projects = t.portfolio.projects as unknown as Project[];
  const skills = t.portfolio.skills as unknown as Skill[];

  return (
    <div className="flex flex-col gap-4">
      <Experiences experiences={experiences} />
      <Education formations={formations} />
      {/* <Projects projects={projects} /> */}
      <Skills skills={skills} />
    </div>
  );
}

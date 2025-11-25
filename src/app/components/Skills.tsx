import { Language, translations } from "../translations";
import Title from "./Global/title";
interface SkillsProps {
  language: Language;
}

export default function Skills({ language }: SkillsProps) {
  const t = translations[language];
  
  return (
    <section id="skills" className="mb-20 scroll-mt-24">
      <Title>{t.skills.title}</Title>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {t.skills.items.map((item, idx) => (
          <div 
            key={idx} 
            className={`card rounded-lg p-5 animate-scale `}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <h3 className="h3-skills font-bold mb-3 text-lg font-mono">
              {`// ${item.category}`}
            </h3>
            <ul className="space-y-2">
              {item.skills.map((skill, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="">▹</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

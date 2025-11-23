import React from 'react';
import { Code, Server, Database, GitBranch } from 'lucide-react';

export default function Skills() {
    const skillsData = [
        {
            category: "Frontend",
            icon: <Code className="w-6 h-6" />,
            skills: ["Vue.js", "React", "Svelte", "Next.js", "TypeScript"]
        },
        {
            category: "Backend",
            icon: <Server className="w-6 h-6" />,
            skills: ["Laravel", "PHP", "NestJs", "Node.js"]
        },
        {
            category: "Base de données",
            icon: <Database className="w-6 h-6" />,
            skills: ["MySQL", "PostgreSQL"]
        },
        {
            category: "Devops",
            icon: <GitBranch className="w-6 h-6" />,
            skills: ["Git", "Github", "Dockers"]
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-5xl font-bold mb-2 text-[#D4AF37]">
                        Compétences
                    </h1>
                    <div className="h-1 w-24 bg-[#D4AF37] rounded-full"></div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.map((skillGroup, index) => (
                        <div
                            key={index}
                            className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-[#D4AF37] transition-all duration-300 group relative"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="p-3 rounded-xl bg-[#D4AF37] text-black">
                                    {skillGroup.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-white">
                                    {skillGroup.category}
                                </h2>
                            </div>

                            {/* Skills list */}
                            <div className="flex flex-wrap gap-3 relative z-10">
                                {skillGroup.skills.map((skill, skillIndex) => (
                                    <span
                                        key={skillIndex}
                                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium text-zinc-200 border border-zinc-700 hover:border-[#D4AF37] transition-all duration-200 cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-[#D4AF37] mb-2">5+</div>
                        <div className="text-sm text-zinc-400">Frameworks Frontend</div>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-[#D4AF37] mb-2">4+</div>
                        <div className="text-sm text-zinc-400">Technologies Backend</div>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-[#D4AF37] mb-2">2</div>
                        <div className="text-sm text-zinc-400">Systèmes de BDD</div>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-[#D4AF37] mb-2">3</div>
                        <div className="text-sm text-zinc-400">Outils DevOps</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
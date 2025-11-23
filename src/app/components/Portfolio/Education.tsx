import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function Experience() {
    const experiences = [
        {
            period: "2022 - en cours",
            company: "Infofil - Genlis",
            role: "CDI - Développeur Fullstack",
            description: "Développement d'applications web sur mesure pour la gestion de données (CSE, CRM, gestion du temps).",
            tech: "Vue.js, Laravel, React, Next.js, Svelte, MySQL, PostgreSQL",
            tasks: [
                "Déploiement et maintenance : Mise en production, configuration des serveurs, gestion des mises à jour et optimisation des performances.",
                "Réalisations clés :"
            ],
            projects: [
                "Plateforme de gestion du Comité Social et Économique (CSE) : tableau de bord, gestion des stocks et des commandes.",
                "Outil de gestion du temps et des congés pour les RH."
            ]
        },
        {
            period: "Avril - Juin 2021",
            company: "Corcelles-lès-Cîteaux",
            role: "Stagiaire - Sidel Packing Solution",
            description: "Stage de 2ème année de DUT : Première expérience professionnelle en développement.",
            mission: "Remplacement d'une bibliothèque PHP et réalisation de tests pour préparer le changement de celle-ci.",
            skills: [
                "Analyse comparative : Établissement d'une méthodologie pour lister et évaluer les fonctionnalités des différentes bibliothèques.",
                "Autonomie dans la prise en charge des tâches et la résolution de problèmes techniques.",
                "Collaboration avec l'équipe pour assurer une transition fluide vers la nouvelle bibliothèque."
            ]
        },
        {
            period: "Juin - Août 2018 à 2022",
            company: "Côte d'or",
            role: "Saisonnier",
            description: "Travail de la vigne estivale dans plusieurs domaines : Digioia Royer et Mugneret Gibourg."
        }
    ];

    return (
        <div className="">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-2">
                        Expérience
                    </h1>
                    <div className="h-1 w-24 rounded-full"></div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5"></div>

                    {experiences.map((exp, index) => (
                        <div key={index} className="relative pl-8 pb-12 last:pb-0">
                            {/* Timeline dot */}
                            <div className="absolute left-0 top-2 w-4 h-4 -ml-[7px] rounded-full ring-4 ring-slate-900"></div>

                            {/* Content card */}
                            <div className="rounded-xl p-6 border border-slate-700/50 transition-all duration-300 ">
                                {/* Period */}
                                <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-3">
                                    <Calendar className="w-4 h-4" />
                                    {exp.period}
                                </div>

                                {/* Company & Location */}
                                <div className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                                    <MapPin className="w-4 h-4" />
                                    {exp.company}
                                </div>

                                {/* Role */}
                                <h3 className="text-2xl font-bold mb-4 text-white">
                                    {exp.role}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-300 mb-4">{exp.description}</p>

                                {/* Tech Stack */}
                                {exp.tech && (
                                    <div className="mb-4">
                                        <span className="text-sm font-semibold text-purple-400">Stack technique : </span>
                                        <span className="text-sm text-slate-300">{exp.tech}</span>
                                    </div>
                                )}

                                {/* Mission */}
                                {exp.mission && (
                                    <div className="mb-4">
                                        <span className="text-sm font-semibold text-purple-400">Mission principale : </span>
                                        <span className="text-sm text-slate-300">{exp.mission}</span>
                                    </div>
                                )}

                                {/* Tasks */}
                                {exp.tasks && (
                                    <div className="mb-4">
                                        {exp.tasks.map((task, idx) => (
                                            <p key={idx} className="text-sm text-slate-300 mb-2">• {task}</p>
                                        ))}
                                    </div>
                                )}

                                {/* Projects */}
                                {exp.projects && (
                                    <div className="ml-4 space-y-2">
                                        {exp.projects.map((project, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"></div>
                                                <p className="text-sm text-slate-300">{project}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Skills */}
                                {exp.skills && (
                                    <div className="space-y-3">
                                        <p className="text-sm font-semibold text-purple-400">Compétences développées :</p>
                                        {exp.skills.map((skill, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"></div>
                                                <p className="text-sm text-slate-300">{skill}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
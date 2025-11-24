"use client"
import {
    Stepper,
    StepperContent,
    StepperIndicator,
    StepperItem,
    StepperNav,
    StepperSeparator,
    StepperTrigger,
} from "@/components/ui/stepper";
import { Language, translations } from "@/lib/translations";
import { Check } from 'lucide-react';

import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function Experience({ language }: { language: Language }) {
    const [activeStep, setActiveStep] = React.useState(1);
    const experienceRefs = React.useRef<HTMLDivElement[]>([]);

    const t = translations[language];

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            experienceRefs.current.forEach((ref, index) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementBottom = elementTop + rect.height;

                    if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
                        setActiveStep(index + 1);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToExperience = (index: number) => {
        experienceRefs.current[index]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    return (
        <div className="text-white p-8 pt-20 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-5xl font-bold mb-2">
                        Expérience
                    </h2>
                    <div className="hero-line h-1 w-24"></div>
                </div>

                <div className="flex gap-8 relative">
                    {/* Stepper Navigation - Vertical à gauche */}
                    <div className="w-24 flex-shrink-0">
                        <div className="sticky top-8">
                            <Stepper
                                value={activeStep}
                                onValueChange={(value) => scrollToExperience(value - 1)}
                                orientation="vertical"
                                indicators={{
                                    completed: <Check className="size-4" />,
                                }}
                            >
                                <StepperNav className="flex flex-col gap-0">
                                    {t.portfolio.experiences.map((_, index) => (
                                        <StepperItem key={index + 1} step={index + 1} className="flex flex-col items-center">
                                            <StepperTrigger>
                                                <StepperIndicator
                                                    className="w-12 h-12 text-lg font-bold rounded-full flex items-center justify-center transition-all duration-300"
                                                >
                                                    {index + 1}
                                                </StepperIndicator>
                                            </StepperTrigger>
                                            {index < t.portfolio.experiences.length - 1 && (
                                                <StepperSeparator
                                                    className="h-24 w-0.5 transition-all duration-300"
                                                />
                                            )}
                                        </StepperItem>
                                    ))}
                                </StepperNav>
                            </Stepper>
                        </div>
                    </div>

                    {/* Experience Content - Liste complète */}
                    <div className="flex-1 space-y-12">
                        {t.portfolio.experiences.map((exp, index) => (
                            <div
                                key={index}
                                ref={(el) => experienceRefs.current[index] = el}
                                className="scroll-mt-8"
                            >
                                <div
                                    className="card rounded-xl p-8 transition-all duration-300"
                                    style={{
                                        borderColor: activeStep === index + 1 ? 'var(--warm-border)' : '',
                                        boxShadow: activeStep === index + 1
                                            ? '0 0 30px var(--warm-shadow)'
                                            : '',
                                        transform: activeStep === index + 1 ? 'scale(1.02)' : 'scale(1)'
                                    }}
                                >
                                    {/* Period */}
                                    <div className="flex items-center gap-2 main-color font-medium mb-3">
                                        <Calendar className="w-5 h-5" />
                                        <span className="glow-subtle">{exp.period}</span>
                                    </div>

                                    {/* Company & Location */}
                                    <div className="flex items-center gap-2 text-zinc-400 mb-4">
                                        <MapPin className="w-5 h-5" />
                                        {exp.company}
                                    </div>

                                    {/* Role */}
                                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <Briefcase className="w-7 h-7 main-color" />
                                        <span>{exp.role}</span>
                                    </h3>

                                    {/* Description */}
                                    <p className="hero-text text-lg mb-6">{exp.description}</p>

                                    {/* Tech Stack */}
                                    {exp.tech && (
                                        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--warm-background)', border: '1px solid var(--warm-border)' }}>
                                            <span className="text-sm font-semibold main-color">Stack technique : </span>
                                            <span className="text-sm hero-text">{exp.tech}</span>
                                        </div>
                                    )}

                                    {/* Mission */}
                                    {exp.mission && (
                                        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--warm-background)', border: '1px solid var(--warm-border)' }}>
                                            <span className="text-sm font-semibold main-color">Mission principale : </span>
                                            <span className="text-sm hero-text">{exp.mission}</span>
                                        </div>
                                    )}

                                    {/* Tasks */}
                                    {exp.tasks && (
                                        <div className="mb-6">
                                            {exp.tasks.map((task, idx) => (
                                                <p key={idx} className="hero-text mb-2">• {task}</p>
                                            ))}
                                        </div>
                                    )}

                                    {/* Projects */}
                                    {exp.projects && (
                                        <div className="ml-4 space-y-3 mb-6">
                                            {exp.projects.map((project, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="animated-dot w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p className="hero-text">{project}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Skills */}
                                    {exp.skills && (
                                        <div className="space-y-3">
                                            <p className="text-base font-semibold main-color glow-subtle">Compétences développées :</p>
                                            {exp.skills.map((skill, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="animated-dot w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p className="hero-text">{skill}</p>
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
        </div>
    );
}
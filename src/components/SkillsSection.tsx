import React from 'react';
import type { SkillCategory } from '../data/profile';
import { Code2, Layers, Cpu, Wrench } from 'lucide-react';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  const categoryIcons = [Code2, Layers, Cpu, Wrench];

  return (
    <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-5 shadow-lg">
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[var(--border-color)]">
        <Code2 className="w-5 h-5 text-emerald-400" />
        <h3 className="font-mono font-bold text-base text-[var(--text-bright)]">
          // Stack Tecnológico & Habilidades
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat, idx) => {
          const Icon = categoryIcons[idx % categoryIcons.length];

          return (
            <div
              key={cat.category}
              className="p-4 rounded-md bg-[var(--bg-main)] border border-[var(--border-color)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-mono font-semibold text-xs text-[var(--text-bright)] tracking-wide uppercase">
                    {cat.category}
                  </h4>
                </div>

                <ul className="space-y-2">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between text-xs font-mono"
                    >
                      <span className="text-[var(--text-bright)]">{skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {skill.level}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

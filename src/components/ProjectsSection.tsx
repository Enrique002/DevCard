import React from 'react';
import type { Project } from '../data/profile';
import { FolderGit2, ExternalLink, Star } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-5 shadow-lg">
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[var(--border-color)]">
        <FolderGit2 className="w-5 h-5 text-emerald-400" />
        <h3 className="font-mono font-bold text-base text-[var(--text-bright)]">
          // Proyectos Destacados
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-4 rounded-md bg-[var(--bg-main)] border border-[var(--border-color)] flex flex-col justify-between hover:border-emerald-500/50 transition-colors group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-mono font-bold text-sm text-[var(--text-bright)] group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  {proj.title}
                  {proj.featured && (
                    <span title="Proyecto Destacado">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                    </span>
                  )}
                </h4>
              </div>

              <p className="font-mono text-xs text-[var(--text-main)] mb-4 leading-relaxed">
                {proj.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-color)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-color)] text-xs font-mono">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[var(--text-main)] hover:text-emerald-400 transition-colors focus:outline-none focus:underline"
                    aria-label={`Ver código fuente de ${proj.title}`}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Código</span>
                  </a>
                )}

                {proj.demoUrl && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-emerald-400 hover:underline transition-colors focus:outline-none"
                    aria-label={`Ver demo en vivo de ${proj.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

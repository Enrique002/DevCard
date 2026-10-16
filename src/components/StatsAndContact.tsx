import React from 'react';
import type { DeveloperStat, SocialLink } from '../data/profile';
import { BarChart3, Share2, Info, Mail, Globe, Link as LinkIcon } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './BrandIcons';

interface StatsAndContactProps {
  stats: DeveloperStat[];
  socialLinks: SocialLink[];
  email?: string;
}

export const StatsAndContact: React.FC<StatsAndContactProps> = ({ stats, socialLinks, email }) => {
  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return GithubIcon;
    if (p.includes('linkedin')) return LinkedinIcon;
    if (p.includes('twitter') || p.includes('x')) return TwitterIcon;
    if (p.includes('portfolio') || p.includes('web')) return Globe;
    return LinkIcon;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Stats Section */}
      <section className="lg:col-span-7 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-5 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[var(--border-color)]">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-mono font-bold text-base text-[var(--text-bright)]">
              // Métricas & Estadísticas
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-3.5 rounded-md bg-[var(--bg-main)] border border-[var(--border-color)] flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {stat.value}
                  </span>
                  <p className="font-mono text-xs font-medium text-[var(--text-bright)] mt-1">
                    {stat.label}
                  </p>
                </div>

                {stat.description && (
                  <p className="font-mono text-[10px] text-[var(--text-main)] mt-2 opacity-80 flex items-center gap-1">
                    {stat.isExample && (
                      <span title="Dato de ejemplo">
                        <Info className="w-3 h-3 text-amber-400 shrink-0" />
                      </span>
                    )}
                    <span>{stat.description}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social & Contact Links */}
      <section className="lg:col-span-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-5 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[var(--border-color)]">
            <Share2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-mono font-bold text-base text-[var(--text-bright)]">
              // Redes & Contacto
            </h3>
          </div>

          <div className="space-y-2.5">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 p-2.5 rounded bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-emerald-500/50 transition-colors group text-xs font-mono"
              >
                <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <p className="text-[10px] text-[var(--text-main)]">Correo Electrónico</p>
                  <p className="text-[var(--text-bright)] group-hover:text-emerald-400 font-semibold truncate">
                    {email}
                  </p>
                </div>
              </a>
            )}

            {socialLinks.map((link) => {
              const Icon = getSocialIcon(link.platform);

              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-emerald-500/50 transition-colors group text-xs font-mono"
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-[var(--text-bright)] group-hover:text-emerald-400 font-semibold">
                        {link.platform}
                      </p>
                      <p className="text-[10px] text-[var(--text-main)] truncate">{link.label}</p>
                    </div>
                  </div>
                  <span className="text-emerald-400 text-xs font-bold group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

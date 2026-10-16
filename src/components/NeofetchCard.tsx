import React from 'react';
import type { DeveloperProfile } from '../data/profile';
import { User, MapPin, Mail, Cpu, Terminal, Shield, Sparkles } from 'lucide-react';

interface NeofetchCardProps {
  profile: DeveloperProfile;
}

export const NeofetchCard: React.FC<NeofetchCardProps> = ({ profile }) => {
  const specs = profile.systemSpecs || {};

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-5 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left column: Avatar / ASCII Branding */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-3 border-b md:border-b-0 md:border-r border-[var(--border-color)]">
          {profile.avatarUrl ? (
            <div className="relative mb-3 group">
              <img
                src={profile.avatarUrl}
                alt={`Avatar de ${profile.name}`}
                className="w-28 h-28 rounded-full object-cover border-2 border-emerald-500/80 shadow-md group-hover:scale-105 transition-transform duration-200"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[var(--bg-card)]" title="Disponible para oportunidades" />
            </div>
          ) : (
            <div className="w-28 h-28 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono text-3xl mb-3">
              {profile.name.charAt(0)}
            </div>
          )}

          <div className="text-center">
            <h2 className="text-lg font-bold text-[var(--text-bright)] font-mono tracking-wide">
              {profile.name}
            </h2>
            <p className="text-xs text-emerald-400 font-mono">
              @{profile.handle}
            </p>
            {profile.statusText && (
              <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3 h-3" />
                {profile.statusText}
              </span>
            )}
          </div>
        </div>

        {/* Right column: Neofetch System Information */}
        <div className="md:col-span-8 flex flex-col justify-center font-mono text-xs space-y-2">
          {/* Title Header */}
          <div className="pb-2 border-b border-[var(--border-color)] flex items-center justify-between">
            <span className="text-emerald-400 font-bold text-sm">
              {profile.handle.toLowerCase()}@devcard-system
            </span>
            <span className="text-[11px] text-[var(--text-main)] opacity-70">
              ---------------------------
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 pt-1">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-[var(--text-bright)] font-semibold">Rol:</span>
              <span className="text-[var(--text-main)] truncate">{profile.role}</span>
            </div>

            {profile.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[var(--text-bright)] font-semibold">Ubicación:</span>
                <span className="text-[var(--text-main)] truncate">{profile.location}</span>
              </div>
            )}

            {specs.os && (
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[var(--text-bright)] font-semibold">SO:</span>
                <span className="text-[var(--text-main)] truncate">{specs.os}</span>
              </div>
            )}

            {specs.shell && (
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[var(--text-bright)] font-semibold">Shell:</span>
                <span className="text-[var(--text-main)] truncate">{specs.shell}</span>
              </div>
            )}

            {specs.uptime && (
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[var(--text-bright)] font-semibold">Uptime:</span>
                <span className="text-[var(--text-main)] truncate">{specs.uptime}</span>
              </div>
            )}

            {profile.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[var(--text-bright)] font-semibold">Email:</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-emerald-400 hover:underline truncate"
                >
                  {profile.email}
                </a>
              </div>
            )}
          </div>

          {/* Color palette block (classic neofetch style) */}
          <div className="pt-3 flex gap-1.5 items-center">
            <span className="w-3.5 h-3.5 rounded-sm bg-slate-800 border border-slate-700" />
            <span className="w-3.5 h-3.5 rounded-sm bg-red-500" />
            <span className="w-3.5 h-3.5 rounded-sm bg-emerald-500" />
            <span className="w-3.5 h-3.5 rounded-sm bg-yellow-500" />
            <span className="w-3.5 h-3.5 rounded-sm bg-blue-500" />
            <span className="w-3.5 h-3.5 rounded-sm bg-purple-500" />
            <span className="w-3.5 h-3.5 rounded-sm bg-cyan-500" />
            <span className="w-3.5 h-3.5 rounded-sm bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

import { describe, it, expect } from 'vitest';
import { executeCommand, formatProfileSummary } from '../utils/terminalEngine';
import { defaultProfile } from '../data/profile';

describe('terminalEngine', () => {
  it('returns help commands', () => {
    const res = executeCommand('help', defaultProfile);
    expect(res.output.length).toBeGreaterThan(0);
    expect(res.output[0].content).toContain('Comandos disponibles');
  });

  it('handles about command', () => {
    const res = executeCommand('about', defaultProfile);
    expect(res.output.some((i) => i.content.includes(defaultProfile.name))).toBe(true);
    expect(res.output.some((i) => i.value === defaultProfile.role)).toBe(true);
  });

  it('handles skills command', () => {
    const res = executeCommand('skills', defaultProfile);
    expect(res.output[0].content).toContain('Tecnologías');
    expect(res.output.some((i) => i.key === defaultProfile.skillCategories[0].category)).toBe(true);
  });

  it('handles projects command', () => {
    const res = executeCommand('projects', defaultProfile);
    expect(res.output.some((i) => i.content.includes(defaultProfile.projects[0].title))).toBe(true);
  });

  it('handles contact command', () => {
    const res = executeCommand('contact', defaultProfile);
    expect(res.output.some((i) => i.content.includes(defaultProfile.socialLinks[0].platform))).toBe(true);
  });

  it('handles clear command action', () => {
    const res = executeCommand('clear', defaultProfile);
    expect(res.action).toBe('clear');
    expect(res.output).toEqual([]);
  });

  it('handles theme command action', () => {
    const res = executeCommand('theme toggle', defaultProfile, 'dark');
    expect(res.action).toBe('toggle-theme');
  });

  it('handles copy command action', () => {
    const res = executeCommand('copy', defaultProfile);
    expect(res.action).toBe('copy');
  });

  it('returns error output for unknown commands', () => {
    const res = executeCommand('unknown_cmd', defaultProfile);
    expect(res.output[0].type).toBe('error');
    expect(res.output[0].content).toContain('Comando no reconocido');
  });


  it('formats profile summary text correctly', () => {
    const text = formatProfileSummary(defaultProfile);

    expect(text).toContain(defaultProfile.name);
    expect(text).toContain(defaultProfile.role);

    if (defaultProfile.email) {
      expect(text).toContain(defaultProfile.email);
    }
  });

});

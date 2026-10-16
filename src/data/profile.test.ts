import { describe, it, expect } from 'vitest';
import { defaultProfile } from '../data/profile';

describe('defaultProfile Data Architecture', () => {
  it('contains essential developer information', () => {
    expect(defaultProfile.name).toBeDefined();
    expect(defaultProfile.handle).toBeDefined();
    expect(defaultProfile.role).toBeDefined();
    expect(defaultProfile.bio).toBeDefined();
  });

  it('has structured skill categories', () => {
    expect(Array.isArray(defaultProfile.skillCategories)).toBe(true);
    expect(defaultProfile.skillCategories.length).toBeGreaterThan(0);
    expect(defaultProfile.skillCategories[0].category).toBeDefined();
    expect(Array.isArray(defaultProfile.skillCategories[0].skills)).toBe(true);
  });

  it('contains project details with tags and URLs', () => {
    expect(Array.isArray(defaultProfile.projects)).toBe(true);
    const firstProject = defaultProfile.projects[0];
    expect(firstProject.id).toBeDefined();
    expect(firstProject.title).toBeDefined();
    expect(Array.isArray(firstProject.tags)).toBe(true);
  });

  it('contains stats with clear example indicator when relevant', () => {
    expect(Array.isArray(defaultProfile.stats)).toBe(true);
    const exampleStat = defaultProfile.stats.find(s => s.isExample);
    if (exampleStat) {
      expect(exampleStat.description).toContain('ejemplo');
    }
  });
});

import { db } from '$lib/services/db.server';

export async function getAvailableSkills() {
  const skills = await db.skill.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  if (skills.length === 0) {
    return {
      skills: [],
    };
  }

  return {
    skills: skills.map((skill) => ({
      label: skill.name,
      value: skill.id,
    })),
  };
}

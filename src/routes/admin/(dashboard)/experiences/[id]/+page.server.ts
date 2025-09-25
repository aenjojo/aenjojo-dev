import { db } from '$lib/services/db.server';
import { checkAccess } from '../../check-access.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
  await checkAccess(cookies);

  const experience = await db.experience.findFirst({
    select: {
      role: true,
      place: true,
      workType: true,
      workTime: true,
      startDate: true,
      endDate: true,
      description: true,
      ExperienceSkill: {
        select: {
          Skill: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    where: {
      id: params.id,
    },
  });

  const skills = await db.skill.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return { experience, skills };
};

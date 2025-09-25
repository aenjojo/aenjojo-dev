import { db } from '$lib/services/db.server';
import { checkAccess } from '../../check-access.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
  await checkAccess(cookies);

  const education = await db.education.findFirst({
    select: {
      degree: true,
      place: true,
      gpa: true,
      startDate: true,
      endDate: true,
      description: true,
      EducationSkill: {
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

  return { education, skills };
};

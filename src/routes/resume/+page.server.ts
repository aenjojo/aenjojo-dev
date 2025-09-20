import { db } from '$lib/services/db.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const userAbout = await db.about.findFirst({
    select: {
      name: true,
      role: true,
      summary: true,
    },
  });

  const experiences = await db.experience.findMany({
    select: {
      place: true,
      role: true,
      workType: true,
      workTime: true,
      startDate: true,
      endDate: true,
      description: true,
      ExperienceSkill: {
        select: {
          Skill: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const educations = await db.education.findMany({
    select: {
      place: true,
      degree: true,
      startDate: true,
      endDate: true,
      description: true,
      EducationSkill: {
        select: {
          Skill: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const result = {
    name: userAbout?.name ?? '',
    role: userAbout?.role ?? '',
    summary: userAbout?.summary ?? '',
    experiences: experiences.map((exp) => ({
      place: exp.place,
      role: exp.role,
      workType: exp.workType,
      workTime: exp.workTime,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      skills: exp.ExperienceSkill.map((es) => es.Skill.name),
    })),
    educations: educations.map((edu) => ({
      place: edu.place,
      degree: edu.degree,
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description,
      skills: edu.EducationSkill.map((es) => es.Skill.name),
    })),
  };

  return result;
};

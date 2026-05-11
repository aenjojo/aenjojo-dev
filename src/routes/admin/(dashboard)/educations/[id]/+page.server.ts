import { fail } from '@sveltejs/kit';
import { DateTime } from 'luxon';
import { db } from '$lib/services/db.server';
import { checkAccess } from '../../check-access.server';
import type { Actions, PageServerLoad } from './$types';

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

  if (!education) {
    throw new Error();
  }

  const skills = await db.skill.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return {
    education,
    skills: skills.map((e) => ({ value: e.id, label: e.name })),
  };
};

export const actions = {
  update: async ({ cookies, request, params }) => {
    await checkAccess(cookies);

    const form = await request.formData();
    const place = form.get('place');
    const degree = form.get('degree');
    const gpa = form.get('gpa');
    const startDate = form.get('start-date');
    const endDate = form.get('end-date');
    const description = form.get('description');
    const skills = form.getAll('skills');

    if (!place || !degree || !gpa || !startDate) {
      return fail(400, { missing: true });
    }

    const descList = description
      ?.toString()
      .split(/(?:\r\n+|\r+|\n+)/g)
      .filter((e) => e !== '');

    await db.education.update({
      data: {
        place: place.toString(),
        degree: degree.toString(),
        gpa: Number(gpa.toString()) * 100 || 0,
        startDate: DateTime.fromISO(startDate.toString()).toJSDate(),
        description: descList,
        EducationSkill: {
          deleteMany: {
            educationId: params.id,
          },
          connectOrCreate: skills.map((skill) => ({
            create: {
              Skill: {
                connect: { id: skill.toString() },
              },
            },
            where: {
              educationId_skillId: {
                educationId: params.id,
                skillId: skill.toString(),
              },
            },
          })),
        },
        ...(endDate && {
          endDate: DateTime.fromISO(endDate.toString()).toJSDate(),
        }),
      },
      where: { id: params.id },
    });

    return { success: true };
  },
} satisfies Actions;

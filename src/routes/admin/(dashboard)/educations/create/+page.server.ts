import { DateTime } from 'luxon';
import { checkAccess } from '../../check-access.server';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/services/db.server';

export const load: PageServerLoad = async ({ cookies }) => {
  await checkAccess(cookies);
  return;
};

export const actions = {
  create: async ({ cookies, request }) => {
    await checkAccess(cookies);

    const form = await request.formData();
    const place = form.get('place');
    const degree = form.get('degree');
    const gpa = form.get('gpa');
    const startDate = form.get('start-date');
    const endDate = form.get('end-date');
    const description = form.get('description');
    const skills = form.get('skills');

    if (!place || !degree || !gpa || !startDate || !description || !skills) {
      return fail(400, { missing: true });
    }

    const descList = description
      .toString()
      .split(/(?:\r\n+|\r+|\n+)/g)
      .filter((e) => e !== '');

    const skillList = skills
      .toString()
      .split(/(?:; +)/g)
      .filter((e) => e !== '');

    await db.education.create({
      data: {
        place: place.toString(),
        degree: degree.toString(),
        gpa: Number(gpa.toString()) || 0,
        startDate: DateTime.fromISO(startDate.toString()).toJSDate(),
        description: descList,
        EducationSkill: {
          create: skillList.map((skillId) => ({
            Skill: {
              connect: { id: skillId },
            },
          })),
        },
        ...(endDate && {
          endDate: DateTime.fromISO(endDate.toString()).toJSDate(),
        }),
      },
    });

    return { success: true };
  },
} satisfies Actions;

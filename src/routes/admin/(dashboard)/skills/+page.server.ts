import { SkillType } from '@prisma/client';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/services/db.server';
import { checkAccess } from '../check-access.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  await checkAccess(cookies);

  const skills = await db.skill.findMany({
    select: {
      id: true,
      name: true,
      type: true,
    },
  });

  return { skills };
};

export const actions = {
  create: async ({ cookies, request }) => {
    await checkAccess(cookies);

    const form = await request.formData();
    const name = form.get('name');
    const type = form.get('type');

    if (!name || !type) {
      return fail(400, { missing: true });
    }

    const skillName = name.toString();
    const skillType = type.toString().toLowerCase() as SkillType;
    const skillId = skillName.toLowerCase().replaceAll(/[ -/]+/g, '-');

    if (!Object.hasOwn(SkillType, skillType)) {
      return fail(400, { unknown: true });
    }

    await db.skill.upsert({
      create: {
        id: skillId,
        name: skillName,
        type: skillType,
      },
      update: {
        name: skillName,
        type: skillType,
      },
      where: { id: skillId },
    });

    return { success: true };
  },
  delete: async ({ cookies, request }) => {
    await checkAccess(cookies);

    const form = await request.formData();
    const id = form.get('id');

    if (!id) {
      return fail(400, { id, missing: true });
    }

    await db.skill.delete({
      where: {
        id: id.toString().toLowerCase().replaceAll(/ +/g, '-'),
      },
    });

    return { success: true };
  },
} satisfies Actions;

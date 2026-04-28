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
    },
  });

  return { skills };
};

export const actions = {
  create: async ({ cookies, request }) => {
    await checkAccess(cookies);

    const form = await request.formData();
    let name = form.get('name');

    if (!name) {
      return fail(400, { name, missing: true });
    }

    name = name.toString();
    const id = name.toLowerCase().replaceAll(/ +/g, '-');

    await db.skill.upsert({
      create: { id, name },
      update: { name },
      where: { id },
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

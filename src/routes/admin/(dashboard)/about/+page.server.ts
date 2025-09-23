import { db } from '$lib/services/db.server';
import { fail } from '@sveltejs/kit';
import { checkAccess } from '../check-access.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  await checkAccess(cookies);

  const data = await db.about.findFirst({
    select: {
      name: true,
      role: true,
      summary: true,
    },
    where: { id: '1' },
  });

  if (!data) {
    return {
      name: '',
      role: '',
      summary: '',
    };
  }

  return data;
};

export const actions = {
  default: async ({ cookies, request }) => {
    await checkAccess(cookies);

    const form = await request.formData();
    const name = form.get('name');
    const role = form.get('role');
    const summary = form.get('summary');

    if (!name) {
      return fail(400, { name, missing: true });
    }

    await db.about.update({
      data: {
        name: name.toString(),
        role: role?.toString() || '',
        summary: summary?.toString() || '',
      },
      where: { id: '1' },
    });

    return { success: true };
  },
} satisfies Actions;

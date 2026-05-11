import { fail } from '@sveltejs/kit';
import { db } from '$lib/services/db.server';
import { checkAccess } from '../check-access.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  await checkAccess(cookies);

  const educations = await db.education.findMany({
    select: {
      id: true,
      degree: true,
      place: true,
      gpa: true,
      startDate: true,
      endDate: true,
    },
    orderBy: {
      startDate: 'desc',
    },
  });

  return { educations };
};

export const actions = {
  delete: async ({ cookies, request }) => {
    await checkAccess(cookies);

    const form = await request.formData();
    const id = form.get('id');

    if (!id) {
      return fail(400, { notFound: true });
    }

    await db.education.delete({
      where: { id: id.toString() },
    });

    return { success: true };
  },
} satisfies Actions;

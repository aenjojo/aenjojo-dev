import { db } from '$lib/services/db.server';
import { checkAccess } from '../check-access.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  await checkAccess(cookies);

  const experiences = await db.experience.findMany({
    select: {
      id: true,
      role: true,
      place: true,
      workType: true,
      workTime: true,
      startDate: true,
      endDate: true,
    },
    orderBy: {
      startDate: 'desc',
    },
  });

  return experiences;
};

export const actions = {
  create: async () => {},
  update: async () => {},
  delete: async () => {},
} satisfies Actions;

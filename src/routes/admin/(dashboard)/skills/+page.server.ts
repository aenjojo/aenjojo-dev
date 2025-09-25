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

  return skills;
};

export const actions = {
  create: async () => {
    //
  },
  update: async () => {
    //
  },
  delete: async () => {
    //
  },
} satisfies Actions;

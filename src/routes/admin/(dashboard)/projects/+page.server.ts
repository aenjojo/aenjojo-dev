import { db } from '$lib/services/db.server';
import { checkAccess } from '../check-access.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  await checkAccess(cookies);

  const projects = await db.project.findMany({
    select: {
      id: true,
      title: true,
      code: true,
      brief: true,
    },
  });

  return projects;
};

export const actions = {
  create: async () => {},
  update: async () => {},
  delete: async () => {},
} satisfies Actions;

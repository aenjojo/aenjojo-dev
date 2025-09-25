import { db } from '$lib/services/db.server';
import { checkAccess } from '../check-access.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  await checkAccess(cookies);

  const links = await db.link.findMany({
    select: {
      id: true,
      code: true,
      url: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return links;
};

export const actions = {
  create: async () => {},
  update: async () => {},
  delete: async () => {},
} satisfies Actions;

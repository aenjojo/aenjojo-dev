import { db } from '$lib/services/db.server';
import { checkAccess } from '../check-access.server';
import type { PageServerLoad } from './$types';

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

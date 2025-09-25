import { db } from '$lib/services/db.server';
import { checkAccess } from '../../check-access.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
  await checkAccess(cookies);

  const link = await db.link.findFirst({
    select: {
      code: true,
      url: true,
      meta: true,
    },
    where: {
      id: params.id,
    },
  });

  return link;
};

export const actions = {
  default: async () => {
    //
  },
} satisfies Actions;

import { db } from '$lib/services/db.server';
import { checkAccess } from '../check-access.server';
import type { PageServerLoad } from './$types';

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

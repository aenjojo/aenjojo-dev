import { db } from '$lib/services/db.server';
import { checkAccess } from '../../check-access.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
  await checkAccess(cookies);

  const project = await db.project.findFirst({
    select: {
      code: true,
      title: true,
      brief: true,
      detail: true,
      imageUrl: true,
      repoUrl: true,
      liveUrl: true,
      ProjectStack: {
        select: {
          Stack: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    where: {
      id: params.id,
    },
  });

  const stacks = await db.skill.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return { project, stacks };
};

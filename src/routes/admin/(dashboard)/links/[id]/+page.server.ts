import { checkAccess } from '../../check-access.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  await checkAccess(cookies);
  return;
};

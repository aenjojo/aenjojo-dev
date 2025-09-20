import { db } from '$lib/services/db.server';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  db;
  if (params.id !== 'ss') {
    error(404, 'not found');
  }
  redirect(303, 'https://resume.aenjojo.dev');
};

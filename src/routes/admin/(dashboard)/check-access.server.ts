import { keys } from '$lib/data/constant.server';
import { db } from '$lib/services/db.server';
import { redirect, type Cookies } from '@sveltejs/kit';
import { createHash } from 'node:crypto';
import { DateTime } from 'luxon';

export async function checkAccess(cookies: Cookies) {
  const sessionToken = cookies.get(keys.cookie.sesionToken);

  if (!sessionToken) {
    redirect(303, '/admin/auth');
  }

  const [selector, verifier] = sessionToken.split('.');

  const session = await db.session.findFirst({
    select: {
      hash: true,
      expiredAt: true,
    },
    where: { id: selector },
  });

  if (!session || session.expiredAt < DateTime.now().toJSDate()) {
    redirect(303, '/admin/auth');
  }

  const hashedVerifier = createHash('sha256').update(verifier).digest('hex');

  if (session.hash !== hashedVerifier) {
    redirect(303, '/admin/auth');
  }

  return true;
}

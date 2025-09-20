import { keys } from '$lib/data/constant.server';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/services/db.server';
import { password as bunPassword } from 'bun';
import { randomBytes, createHash } from 'node:crypto';
import { DateTime } from 'luxon';
import { log } from '$lib/services/log.server';

export const load: PageServerLoad = async ({ cookies }) => {
  const sessionToken = cookies.get(keys.cookie.sesionToken);

  if (!sessionToken) {
    return;
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
    return;
  }

  const hashedVerifier = createHash('sha256').update(verifier).digest('hex');

  if (session.hash !== hashedVerifier) {
    return;
  }

  redirect(303, '/admin/welcome');
};

export const actions = {
  login: async ({ cookies, request }) => {
    const form = await request.formData();
    const username = form.get('username');
    const password = form.get('password');

    if (!username || !password || username === '' || password === '') {
      return fail(400, { username, missing: true });
    }

    const user = await db.user.findFirst({
      select: {
        id: true,
        password: true,
      },
      where: { username: username.toString() },
    });

    if (!user) {
      return fail(400, { username, incorrect: true });
    }

    const passwordMatch = await bunPassword.verify(password.toString(), user.password);

    if (!passwordMatch) {
      return fail(400, { username, incorrect: true });
    }

    const randomVerifier = randomBytes(32).toString('hex');
    const hashedVerifier = createHash('sha256').update(randomVerifier).digest('hex');
    const expireTime = DateTime.now().plus({ day: 1 }).toJSDate();

    const newSession = await db.session.create({
      data: {
        hash: hashedVerifier,
        expiredAt: expireTime,
        userId: user.id,
      },
      select: { id: true },
    });

    const newSessionToken = `${newSession.id}.${randomVerifier}`;
    cookies.set(keys.cookie.sesionToken, newSessionToken, {
      path: '/',
      sameSite: 'lax',
      expires: expireTime,
      httpOnly: true,
      secure: true,
    });

    redirect(303, '/admin/welcome');
  },
  logout: async () => {
    //
  },
} satisfies Actions;

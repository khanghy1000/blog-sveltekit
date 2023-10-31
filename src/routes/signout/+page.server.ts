import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) return fail(401);

    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);
    throw redirect(302, '/');
  }
};
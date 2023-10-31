import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) throw redirect(302, '/login');
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, '/login');

    const data = await request.formData();
    const title = String(data.get('title'));
    const content = String(data.get('content'));

    if (!title || !content) {
      const errors: { title?: string; content?: string } = {};
      if (!title) errors.title = 'Title is required';
      if (!content) errors.content = 'Content is required';

      return fail(400, {
        title,
        content,
        errors
      });
    }

    const post = await prisma.post.create({
      data: {
        userId: session.user.userId,
        title,
        content
      }
    });

    throw redirect(302, `/posts/${post.id}`)
  }
};

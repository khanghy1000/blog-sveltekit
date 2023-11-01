import { redirect, type Actions, fail, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) throw redirect(302, '/login');

  const post = await prisma.post.findUnique({
    where: {
      id: params.id
    }
  });

  if (post?.userId !== session.user.userId) throw error(403, 'Forbidden');

  return {
    post
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ locals, request, params }) => {
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, '/login');

    const post = await prisma.post.findUnique({
      where: {
        id: params.id
      }
    });

    if (post?.userId !== session.user.userId) return fail(403);

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

    const updatedPost = await prisma.post.update({
      where: {
        id: params.id
      },
      data: {
        title,
        content
      }
    });

    throw redirect(302, `/posts/${updatedPost.id}`);
  }
};

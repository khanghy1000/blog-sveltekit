import { prisma } from '$lib/server/prisma';
import { error, type Actions, redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id
    },
    include: {
      User: true
    }
  });

  if (!post) throw error(404, 'Not found');

  const session = await locals.auth.validate();

  return {
    post,
    session
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  delete: async ({ params, locals }) => {
    const session = await locals.auth.validate();
    const post = await prisma.post.findUnique({
      where: {
        id: params.id
      }
    });

    if (session?.user.userId !== post?.userId) {
      return fail(403);
    }

    await prisma.post.delete({
      where: {
        id: params.id
      }
    });
    throw redirect(302, '/');
  }
};

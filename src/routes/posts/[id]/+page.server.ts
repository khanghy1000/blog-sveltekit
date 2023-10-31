import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, setHeaders }) => {
  setHeaders({
    'Cache-Control': 'max-age=0, s-maxage=60'
  })

  const post = await prisma.post.findUnique({
    where: {
      id: params.id
    }
  });

  if (!post) throw error(404, 'Not found');

  const user = await prisma.user.findUnique({
    where: {
      id: post.userId ?? undefined
    }
  });

  if (!user) throw error(404, 'Not found');

  return {
    post,
    user
  };
}) satisfies PageServerLoad;

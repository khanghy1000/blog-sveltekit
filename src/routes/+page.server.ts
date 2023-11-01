import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
  const page = url.searchParams.get('page');
  const parsedPage = page && +page > 0 ? +page - 1 : 0;

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 10,
    skip: parsedPage * 10
  });

  const postCount = await prisma.post.count();

  return { posts, postCount };
}) satisfies PageServerLoad;

import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ setHeaders }) => {
  setHeaders({
    'Cache-Control': 'max-age=0, s-maxage=60'
  });
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return { posts };
}) satisfies PageServerLoad;

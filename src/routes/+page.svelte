<script lang="ts">
  import { formatDate } from '$lib/utils/formatData';
  import type { PageServerData } from './$types';

  export let data: PageServerData;
</script>
<div class="max-w-2xl mx-auto p-5 ">
  {#each data?.posts as post}
    <div>
      <a href={`/posts/${post.id}`} class="text-2xl font-semibold">{post.title}</a>
      <p class="mt-5">{formatDate(post.createdAt)}</p>
      <div class="divider"></div>
    </div>
  {/each}
</div>
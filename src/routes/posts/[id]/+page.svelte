<script lang="ts">
  import { formatDate } from '$lib/utils/formatData';
  import type { PageServerData } from './$types';

  export let data: PageServerData;
</script>

<div class="p-5">
  <div class="max-w-2xl mx-auto">
    <h3 class="text-3xl font-semibold mb-1">{data.post.title}</h3>
    <p class="mb-1">Author: {data.user.username}</p>
    <p class="italic text-sm text-content2">Created at: {(formatDate(data.post.createdAt))}</p>
    <p class="italic text-sm text-content2 mb-5">Last updated: {formatDate(data.post.updatedAt)}</p>
    <p>{data.post.content}</p>
  </div>
</div>
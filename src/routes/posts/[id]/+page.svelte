<script lang="ts">
  import { enhance } from '$app/forms';
  import { formatDate } from '$lib/utils/formatData';
  import type { PageServerData } from './$types';

  export let data: PageServerData;
</script>

<svelte:head>
  <title>{data.post.title}</title>
</svelte:head>

<div class="p-5">
  <div class="max-w-2xl mx-auto">
    <h3 class="text-3xl font-semibold mb-1">{data.post.title}</h3>
    <p class="mb-1">Author: {data.post.User?.username}</p>
    <p class="italic text-sm text-content2">Created at: {(formatDate(data.post.createdAt))}</p>
    <p class="italic text-sm text-content2 mb-5">Last updated: {formatDate(data.post.updatedAt)}</p>
    {#if data.post.userId == data.session?.user.userId}
      <div class="flex flex-row gap-3 mb-5 justify-center">
        <a class="btn btn-solid-primary" href={`/posts/${data.post.id}/update`}>Update</a>
        <form action="?/delete" method="post" use:enhance><button class="btn btn-solid-error">Delete</button></form>
      </div>
    {/if}
    <p>{data.post.content}</p>
  </div>
</div>
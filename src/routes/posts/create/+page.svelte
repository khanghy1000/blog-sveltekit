<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData, PageData, PageServerData } from './$types';

  export let form: ActionData | null;
</script>

<div class="p-5">
  <form
    method="post"
    class="form-group mx-auto flex w-full max-w-2xl flex-col rounded-xl border border-border bg-backgroundSecondary p-5 sm:p-10 my-5 gap-5"
    use:enhance
  >
    <div class="form-field">
      <label class="form-label" for="title">Title</label>
      <input type="text" class="input max-w-full" id="title" name="title" />
      {#if form?.errors?.title}
        <p class="text-red-600">{form.errors.title}</p>
      {/if}
    </div>
  
    <div class="form-field">
      <label class="form-label" for="content">Content</label>
      <textarea rows="10" class="textarea max-w-full resize-none" id="content" name="content" />
      {#if form?.errors?.content}
        <p class="text-red-600">{form.errors.content}</p>
      {/if}
    </div>
  
    <button class="btn btn-primary mt-5">Submit</button>
  </form>
</div>

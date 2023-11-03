<script lang="ts">
  import type { ActionData, PageServerData } from './$types';
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';
  import { enhance } from '$app/forms';

  export let form: ActionData;
  export let data: PageServerData;

  let element: HTMLDivElement;
  let editor: Editor;
  let contentField: HTMLInputElement;

  onMount(() => {
    editor = new Editor({
      element,
      content: data.post.content,
      extensions: [
        StarterKit,
        Placeholder.configure({
          emptyEditorClass:
            'before:content-[attr(data-placeholder)] before:float-left before:h-0 before:pointer-events-none before:text-content3',
          placeholder: 'Write something …'
        })
      ],

      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
      editorProps: {
        attributes: {
          class: 'prose dark:prose-invert focus:outline-none p-5'
        }
      }
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  const handleSubmit = async () => {
    contentField.value = editor.getHTML();
  };
</script>

<svelte:head>
  <title>Update</title>
</svelte:head>

<div class="p-5">
  <form
    method="POST"
    on:submit={handleSubmit}
    class="form-group max-w-2xl mx-auto gap-5"
    use:enhance
  >
    <div class="form-field">
      <label for="title" class="form-label">Title</label>
      <input type="text" id="title" name="title" class="input max-w-full" value={data.post.title} />
      {#if form?.errors?.title}
        <p class="text-red-600">{form.errors.title}</p>
      {/if}
    </div>
    <div class="form-field">
      <label for="" class="form-label">Content</label>
      <div class="rounded border border-border">
        {#if editor}
          <div class="tabs ring-1 w-full ring-border p-3 rounded">
            <button
              class="tab text-2xl font-[700]"
              on:click|preventDefault={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()}
              class:tab-active={editor.isActive('heading', { level: 2 })}
              class:tab-underline={editor.isActive('heading', { level: 2 })}
            >
              H2
            </button>
            <button
              class="tab text-lg font-[600]"
              on:click|preventDefault={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()}
              class:tab-active={editor.isActive('heading', { level: 3 })}
              class:tab-underline={editor.isActive('heading', { level: 3 })}
            >
              H3
            </button>
            <button
              class="tab"
              on:click|preventDefault={() => editor.chain().focus().setParagraph().run()}
              class:tab-active={editor.isActive('paragraph')}
              class:tab-underline={editor.isActive('paragraph')}
            >
              P
            </button>
          </div>
        {/if}

        <div bind:this={element} />
      </div>
      {#if form?.errors?.content}
        <p class="text-red-600">{form.errors.content}</p>
      {/if}
    </div>

    <input type="hidden" name="content" id="content" bind:this={contentField} />

    <button class="btn btn-primary block mx-auto mt-5">Submit</button>
  </form>
</div>

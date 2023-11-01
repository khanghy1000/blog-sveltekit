<script lang="ts">
  import { enhance } from '$app/forms';
  import type { LayoutServerData } from './$types';
  import './index.css';
  import NProgress from 'nprogress';
  import { navigating } from '$app/stores';
  import './nprogress.css';

  export let data: LayoutServerData;

  NProgress.configure({
    minimum: 0.16,
    showSpinner: false
  });

  $: {
    if ($navigating) {
      NProgress.start();
    }
    if (!$navigating) {
      NProgress.done();
    }
  }
</script>

<nav class="navbar shadow-md">
  <div class="navbar-start">
    <a href="/" class="navbar-item">Blog</a>
  </div>
  <div class="navbar-end">
    <a href="/" class="navbar-item">Home</a>
    <a href="/posts/create" class="navbar-item">Create</a>

    {#if data?.session}
      <div class="dropdown">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <label for="" tabindex="0" class="navbar-item">{data.session.user.githubUsername}</label>
        <div class="dropdown-menu mt-3 max-w-[160px] p-0">
          <div class="dropdown-item p-0">
            <form action="/signout" method="post" use:enhance>
              <button class="w-full p-3 text-left">Sign out</button>
            </form>
          </div>
        </div>
      </div>
    {:else}
      <a href="/login" class="navbar-item">Login</a>
    {/if}
  </div>
</nav>

<slot />

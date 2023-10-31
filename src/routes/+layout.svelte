<script lang="ts">
  import { enhance } from '$app/forms';
  import type { LayoutServerData } from './$types';
  import './index.css';

  export let data: LayoutServerData;
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
        <div class="dropdown-menu mt-3 max-w-[160px]">
          <div class="dropdown-item">
            <form action="/signout" method="post" use:enhance><button>Sign out</button></form>
          </div>
        </div>
      </div>
    {:else}
    <a href="/login" class="navbar-item">Login</a>
    {/if}
  </div>
</nav>

<slot />

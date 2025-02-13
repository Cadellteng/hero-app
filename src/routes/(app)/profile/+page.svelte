<script lang="ts">
  import type { User } from 'firebase/auth';
  import { signOut } from 'firebase/auth';
  import { goto } from '$app/navigation';
  import { auth } from '$lib/firebase';

  export let data
  
  let user: User | null = data.user;

  async function handleLogout() {
    console.log("Logging user out...");
    try {
      await signOut(auth);
      await goto('/login');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Logout error:', error);
      }
    }
  }
</script>

<main>
  <!-- {#if user} -->
    <h1>Welcome, {user.displayName}!</h1>
    <button on:click={handleLogout}>Logout</button>
  <!-- {/if} -->
</main>

<style>
  button {
    margin-top: 2rem;
    width: 100%;
    padding: 1rem;
    background-color: #34344A;
    color: #F2F4F3;
    border: none;
    border-radius: .4rem;
    cursor: pointer;
  }
</style>
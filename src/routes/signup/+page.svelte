<script lang="ts">
  import { auth } from '$lib/firebase';
  import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let displayName = '';
  let errorMessage = '';

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (password !== confirmPassword) {
      errorMessage = 'Passwords do not match';
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, { displayName });

      await goto('/login'); // Redirect to login page after successful signup
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
        console.error('Signup error:', error);
      }
    }
  }
</script>

<main>
  <div class="container">
    <img src="/loginScene.svg" alt="This is the login scene of the app" />
  </div>

  <h1>Sign Up</h1>
  <form on:submit={handleSubmit}>
    <label for="displayName">Display Name<span class="required">*</span></label>
    <input type="text" id="displayName" bind:value={displayName} placeholder="Display Name" required />

    <label for="email">Email<span class="required">*</span></label>
    <input type="email" id="email" bind:value={email} placeholder="Email" required />

    <label for="password">Password<span class="required">*</span></label>
    <input type="password" id="password" bind:value={password} placeholder="Password" required />

    <label for="confirmPassword">Confirm Password<span class="required">*</span></label>
    <input type="password" id="confirmPassword" bind:value={confirmPassword} placeholder="Confirm Password" required />

    <button type="submit">Sign Up</button>

    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}
  </form>
  <p>
    Already have an account? <a href="/login">Login</a>
  </p>
</main>

<style>
  main {
    width: 80vw;
    margin: 0 auto;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
    margin: 2rem auto;
    padding: 0 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  label {
    display: block;
    margin-top: 10px;
  }

  .required {
    color: #DB93B0;
    font-weight: italic;
    margin-left: .2rem;
  }

  input {
    width: 100%;
    padding: 8px;
    border: .1rem solid #ddd;
    margin-top: 5px;
    border-radius: .4rem;
  }

  .error {
    color: red;
    margin-top: 10px;
  }

  p {
    margin-top: 1rem;
  }
</style>
<script lang="ts">
  import { auth } from '$lib/firebase';
  import { goto } from '$app/navigation';
  import { signInWithEmailAndPassword } from 'firebase/auth';

  let email = '';
  let password = '';
  let errorMessage = '';

  const handleLogin = async (event: SubmitEvent) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    console.log("Logging in!")

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      // Redirect to a different page or perform other actions
      await goto('/'); // Redirect after successful login
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
        console.error('Login error:', error);
      }
    }
  };
</script>

<div class="container">
  <img src="/loginScene.svg" alt="This is the login scene of the app" />
</div>

<!-- Login Fields -->
<div class="sign-in-container">
  <div class="federated-signin">
    <!-- facebook and google federated sign in buttons below -->
    <div class="social-buttons">
      <button class="social-button">
        <!-- <img src="/facebook.svg" alt="Facebook"> -->
        <p>Continue with Google</p>
      </button>
    </div>
    <div class="social-buttons">
      <button class="social-button">
        <!-- <img src="/google.svg" alt="Google"> -->
        <p>Continue with Facebook</p>
      </button>
    </div>
  </div>

  <hr class="separator">
  
  <form class="sign-in-form" on:submit={handleLogin}>
    <p>Or sign in with:</p>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="Email" bind:value={email}>
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Password" required bind:value={password}>
    </div>
    <button id="login-btn" type="submit">Sign in</button>
  </form>

  <p>
    Don't have an account? <a href="/signup">Sign up</a>
  </p>

  {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
  {/if}
</div>



<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
    max-width: 50rem;
    margin: 2rem auto;
    padding: 0 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .sign-in-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .sign-in-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 50rem;
    padding: 2rem;
    background-color: #F2F4F3;
    border-radius: .4rem;
  }

  .form-group {
    width: 100%; /* Add this to make form groups take full width */
  }

  label {
    display: flex;
    margin-top: .5rem;
    margin-bottom: .5rem;
    font-weight: bold;
    color: var(--primary-color);
    width: 100%;
  }

  input {
    width: 100%;
    padding: .5rem;
    border: .1rem solid var(--primary-color);
    border-radius: .4rem;
    box-sizing: border-box;
  }

  button {
    color: var(--neutral-color);
  }

  .separator {
    width: 100%;
    height: .1rem;
    background-color: var(--primary-color);
    margin: 1rem 0;
  }

  .federated-signin {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* Centers content vertically if needed */
    width: 80%; /* Ensures it spans the full width of the parent container */
    max-width: 50rem;
    margin: 1rem auto;
    text-align: center; /* Ensures text is centered */
  }

  .social-buttons {
    margin-top: 1rem;
    width: 75%;
  }
  .social-button {
    width: 100%;
    padding: 1rem;
    background-color: #34344A;
    color: #F2F4F3;
    border: none;
    border-radius: .4rem;
    cursor: pointer;
    margin: 0 auto;
  }

</style>
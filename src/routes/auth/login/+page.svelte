<script>
  import { page } from '$app/stores';
  import Metadata from '../../../components/metadata.svelte';
  import LoginError from './login-error.svelte';
  /** @type {import('./$types').ActionData} */
  export let form;

  const success = form?.success;
  const error = $page.url.searchParams.get('error') ?? form?.reason;
  const reason = $page.url.searchParams.get('reason');
</script>

<Metadata title="Logg inn" description="Logg inn på Min konto" path="/auth/login" />

<main>
  <div class="container">
    {#if success === true}
      <div class="info">
        <h1>Sjekk din e-post</h1>
        <p>Vi har sendt deg en e-post. Den inneholder en lenke som logger deg inn</p>
        <p>Du kan lukke dette vinduet.</p>
      </div>
    {:else}
      {#if error}
        <LoginError {error} />
      {/if}
      {#if reason === 'logout'}
        <div class="alert">Du er logget ut!</div>
      {/if}
      <form method="POST">
        <label>
          E-post
          <input name="email" type="email" />
        </label>
        <button type="submit">Send innloggingslenke</button>
      </form>
    {/if}
  </div>
</main>

<style>
  main {
    width: min(64ch, 100% - 4rem);
    margin-inline: auto;
  }

  .container {
    display: grid;
    gap: 1rem;
    width: min(30ch, 100% - 4rem);
    margin-inline: auto;
  }

  .info {
    display: grid;
    max-width: 30ch;
    text-align: center;
  }
  form {
    display: grid;
    gap: 1rem;
  }
  label {
    display: grid;
    gap: 0.5rem;
  }
  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
  button {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
</style>

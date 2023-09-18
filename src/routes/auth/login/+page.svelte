<script>
  import { page } from '$app/stores';
  /** @type {import('./$types').ActionData} */
  export let form;

  const error = $page.url.searchParams.get('error');
</script>

<div class="container">
  {#if form?.success}
    <div class="info">
      <h1>Sjekk din e-post</h1>
      <p>Vi har sendt deg en e-post. Den inneholder en lenke som logger deg inn</p>
      <p>Du kan lukke dette vinduet.</p>
    </div>
  {:else}
    {#if error === 'missing-email'}
      <div class="alert">⚠️ En feil oppsto under innloggingen. Vennligst prøv igjen.</div>
    {/if}
     {#if error === 'code-expired'}
      <div class="alert">⚠️ En feil oppsto under innloggingen. Vennligst prøv igjen.</div>
    {/if}
    <form method="POST">
      <label>
        E-post
        <input name="email" type="email" />
      </label>
      <button>Send innloggingslenke</button>
    </form>
  {/if}
</div>

<style>
  .container {
    display: grid;
    gap: 1rem;
    width: min(30ch, 100% - 4rem);
    margin-inline: auto;
  }

  .alert {
    padding: 2rem;
    color: #fff;
    background-color: hsl(var(--color-primary-base), 100%, 10%);
    border-radius: 1rem;
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

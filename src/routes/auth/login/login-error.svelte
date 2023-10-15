<script>
  /** @type {string} **/
  export let error = '';
</script>

{#if error === 'missing-email'}
  <div class="alert">⚠️ En feil oppsto under innloggingen. Vennligst prøv igjen.</div>
{:else if error === 'code-expired'}
  <div class="alert">⚠️ En feil oppsto under innloggingen. Vennligst prøv igjen.</div>
{:else if error === 'forbidden'}
  <div class="alert">⚠️ Du har ikke tilgang til løsningen</div>
{:else if error}
  <div class="alert">⚠️ En feil oppsto under innloggingen. Vennligst prøv igjen.</div>
{/if}

<style>
  .alert {
    padding: 2rem;
    color: #fff;
    background-color: hsl(var(--color-primary-base), 100%, 10%);
    border-radius: 1rem;
  }
</style>

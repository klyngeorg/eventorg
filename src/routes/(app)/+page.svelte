<script>
  import Metadata from '../../components/metadata.svelte';
</script>

<Metadata title="Min konto" description="Din konto hos Klynge Næringsforening" path="/auth/login" />

<main>
  <h1>Din konto hos Klynge Næringsforening</h1>
  <p>Her vi snart kunne se ditt medlemskap, og invitere gjester til våre arrangementer.</p>
  <a href="/auth/logout">Logg ut</a>
</main>

<style>
  main {
    width: min(64ch, 100% - 4rem);
    margin-inline: auto;
  }
</style>

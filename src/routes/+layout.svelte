<main>
  <slot />
</main>

<style>
  :global(html) {
    color-scheme: light dark;
  }

  :global(body) {
    font-family: system-ui, sans-serif;
    font-size: 1.125rem;
    line-height: 1.5;
  }

  :global(:root) {
    --color-primary-base: 175;
  }
</style>

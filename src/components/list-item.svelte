<a href="https://vg.no/" target="_blank">
  <slot />
</a>

<style>
  a {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    padding: 1rem;
    color: inherit;
    cursor: pointer;  
    text-decoration: none;

    outline-color: hsl(var(--color-primary-base), 82%, 20%);
  }
</style>
<script>
  /** @type {string} */
  export let ariaLabel;

  /**
   * This function handles keyboard navigation for the list.
   * See https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
   * 
   * @param {KeyboardEvent} event - The keyboard event.
   */
  function handleKeyDown(event) {
    const currentTarget = event.currentTarget;
    if (!currentTarget) return;

    /** @type {HTMLElement[]} */
    const items = Array.from(currentTarget.children);

    if (event.key === 'Home') {
      // Prevent scrolling
      event.preventDefault();

      if (items[0]) {
        items[0].focus();
      }
    } else if (event.key === 'End') {
      // Prevent scrolling
      event.preventDefault();

      if (items[items.length - 1]) {
        items[items.length - 1].focus();
      }
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const currentIndex = items.findIndex((item) => document.activeElement === item);
      const nextIndex = currentIndex + (event.key === 'ArrowUp' ? -1 : 1);
      items[nextIndex]?.focus();
    }
  }
</script>

<div role="listbox" tabindex="0" aria-label={ariaLabel} on:keydown={handleKeyDown}>
  <slot />
</div>

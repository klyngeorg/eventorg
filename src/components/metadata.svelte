<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';
  import type { Picture } from 'vite-imagetools';

  type MetadataImage = Picture | string;

  function isPicture(image: string | Picture): image is Picture {
    return typeof image !== 'string' && 'img' in image;
  }

  function parseImage(image: MetadataImage): string {
    if (isPicture(image)) {
      return image.img.src;
    }

    return image;
  }

  function parseMetaText(text: string): string {
    return text
      .replace(/<[^>]*>|[\n\r]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const defaultDescription = `
  Klynge er en gruppe menneske som deler erfaringer, nettverk, samarbeider og støtter hverandre.
  `;

  const defaultTitle = 'Min konto';

  /**
   * The ideal length for a title is approx. 60 characters.
   * When exceeding this limit, search engines will truncate the title.
   */
  export let title: string = defaultTitle;

  /**
   * The ideal length is between 70 and 155 characters.
   * Minium length is 70 characters.
   * When exceeding this limit, search engines will truncate the description.
   */
  export let description: string = defaultDescription;

  /**
   * The ideal length for a title is approx. 47 characters.
   * When exceeding this limit, platforms will truncate the title.
   *
   * LinkedIn will truncate the title at 119 characters.
   */
  export let socialMediaTitle = title ?? defaultTitle;

  /**
   * Should not exceed 85 characters to fit most platforms.
   */
  export let socialMediaDescription = description ?? defaultDescription;

  /**
   * The ideal size is 1200 x 630 pixels.
   * When you are providing more than one image, the first image will be used, but some
   * platforms will allow the user to choose which image to use.
   */
  export let images: MetadataImage[] = [];

  /**
   * Used to generate the canonical URL.
   */
  export let path: string = '/';

  const parsedImages = images.map((image) => parseImage(image));
  const [image] = parsedImages;

  const canonical = new URL(path, 'https://konto.klyngeorg.no').toString();
</script>

<MetaTags
  title={parseMetaText(title)}
  description={parseMetaText(description)}
  {canonical}
  openGraph={{
    type: 'website',
    siteName: 'Klynge Næringsforening',
    title: parseMetaText(socialMediaTitle),
    description: parseMetaText(socialMediaDescription),
    images: parsedImages.map((image) => ({
      url: image
    }))
  }}
  twitter={{
    cardType: 'summary_large_image',
    title: parseMetaText(socialMediaTitle),
    description: parseMetaText(socialMediaDescription),
    image
  }}
/>

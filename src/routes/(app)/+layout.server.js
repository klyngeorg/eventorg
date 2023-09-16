import { getSession } from '$lib/auth/session';
import { createConfig } from '$lib/config';
import { createFirestoreClient } from '$lib/db';
import { redirect } from '@sveltejs/kit';

const config = createConfig();
const database = createFirestoreClient(config.GOOGLE_PROJECT_ID);

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const session = await getSession(database, cookies, config.COOKIE_SIGNING_SECRET);
  if (!session) {
    throw redirect(303, '/auth/login');
  }

  console.log({ session }, 'Found a session');

  return {
    props: {
      session
    }
  };
}

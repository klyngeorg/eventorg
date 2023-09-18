import { redirect } from '@sveltejs/kit';
import { createConfig } from '$lib/config';
import { deleteSession } from '$lib/auth/session';
import { createFirestoreClient } from '$lib/db';

const config = createConfig();
const database = createFirestoreClient(config.GOOGLE_PROJECT_ID);

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies }) {
  await deleteSession(database, cookies, config.COOKIE_SIGNING_SECRET);
  throw redirect(302, '/auth/login?reason=logout');
}

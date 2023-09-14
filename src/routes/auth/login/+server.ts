import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getSession } from '$lib/auth/session';
import { createConfig } from '$lib/config';
import { createFirestoreClient } from '$lib/db';

export const GET: RequestHandler = async ({ cookies }) => {
  const config = createConfig();
  const database = createFirestoreClient();
  const session = await getSession(database, cookies, config.COOKIE_SIGNING_SECRET);

  // If the user is already logged in, redirect them to the home page.
  if (session) {
    throw redirect(303, '/');
  }

  return json({
    message: 'Hello world!'
  });
};

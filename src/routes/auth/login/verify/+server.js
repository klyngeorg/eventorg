import { error, redirect } from '@sveltejs/kit';
import { createConfig } from '$lib/config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { createSession } from '$lib/auth/session';
import { createFirestoreClient } from '$lib/db';

const config = createConfig();
const database = createFirestoreClient(config.GOOGLE_PROJECT_ID);

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, cookies }) {
  const emailForSignIn = cookies.get('eventorg-email-for-sign-in');
  console.log({ emailForSignIn });
  if (!emailForSignIn) {
    throw redirect(303, '/auth/login?error=missing-email');
  }

  const apiKey = url.searchParams.get('apiKey');
  if (!apiKey || config.FIREBASE_API_KEY !== apiKey) {
    throw error(400, 'Missing apiKey');
  }

  const oobCode = url.searchParams.get('oobCode');
  if (!oobCode) {
    throw error(400, 'Missing oobCode');
  }

  firebase.initializeApp({
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN
  });

  // Do not store firebase auth
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  const result = await firebase
    .auth()
    .signInWithEmailLink(emailForSignIn, url.toString())
    .catch(() => {
      throw redirect(303, '/auth/login?error=code-expired');
    });

  if (!result.user) {
    throw redirect(303, '/auth/login?error=code-expired');
  }

  cookies.delete('eventorg-email-for-sign-in');

  const userId = result.user.uid;
  await createSession(database, cookies, userId, config.COOKIE_SIGNING_SECRET, config.SELF_DOMAIN);

  throw redirect(302, '/');
}

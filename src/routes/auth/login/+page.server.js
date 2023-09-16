import { createSession } from '$lib/auth/session';
import { createConfig } from '$lib/config';
import { createFirestoreClient } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const config = createConfig();
const database = createFirestoreClient(config.GOOGLE_PROJECT_ID);

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      return {
        status: 400,
        body: 'Missing email or password'
      };
    }

    firebase.initializeApp({
      apiKey: config.FIREBASE_API_KEY,
      authDomain: config.FIREBASE_AUTH_DOMAIN
    });
    await firebase
      .auth()
      .signInWithEmailAndPassword(email.toString(), password.toString())
      .then(async (result) => {
        if (!result.user) {
          return {
            status: 400,
            body: 'User not found'
          };
        }

        const userId = result.user.uid;
        await createSession(
          database,
          cookies,
          userId,
          config.COOKIE_SIGNING_SECRET,
          config.SELF_DOMAIN
        );
      })
      .catch((error) => {
        console.error({ error });
      });
    throw redirect(303, '/');
  }
};

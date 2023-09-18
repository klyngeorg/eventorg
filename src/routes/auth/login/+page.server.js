import { $page } from '$app/stores';
import { createConfig } from '$lib/config';
import { createFirestoreClient } from '$lib/db';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const config = createConfig();

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, url, cookies }) => {
    const data = await request.formData();
    const email = data.get('email');

    if (!email) {
      return {
        status: 400,
        body: 'Missing email'
      };
    }

    firebase.initializeApp({
      apiKey: config.FIREBASE_API_KEY,
      authDomain: config.FIREBASE_AUTH_DOMAIN
    });

    // Do not store firebase auth
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    const redirectUrl = new URL('/auth/login/verify', url);

    cookies.set('eventorg-email-for-sign-in', email.toString(), {
      httpOnly: true,
      secure: true,
      maxAge: 20 * 60 // 20 minutes
    });

    await firebase.auth().sendSignInLinkToEmail(email.toString(), {
      url: redirectUrl.toString(),
      handleCodeInApp: true
    });

    return { success: true };
  }
};

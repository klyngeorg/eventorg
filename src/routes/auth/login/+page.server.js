import { createConfig } from '$lib/config';
import { createFirebaseAuth } from '$lib/firebase';
import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes, sendSignInLinkToEmail } from 'firebase/auth';

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

    const auth = createFirebaseAuth(config);

    const redirectUrl = new URL('/auth/login/verify', url);

    cookies.set('eventorg-email-for-sign-in', email.toString(), {
      httpOnly: true,
      secure: true,
      maxAge: 20 * 60 // 20 minutes
    });

    try {
      await sendSignInLinkToEmail(auth, email.toString(), {
        url: redirectUrl.toString(),
        handleCodeInApp: true
      });

      return { success: true };
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === AuthErrorCodes.ADMIN_ONLY_OPERATION) {
          return {
            success: false,
            reason: 'forbidden'
          };
        }

        return {
          success: false
        };
      }
    }
  }
};

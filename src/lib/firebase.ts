import { initializeApp } from 'firebase/app';
import type { Config } from './config';
import { getAuth, inMemoryPersistence } from 'firebase/auth';

export function createFirebaseApp(config: Config) {
  return initializeApp({
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN
  });
}

export function createFirebaseAuth(config: Config) {
  const app = createFirebaseApp(config);

  const auth = getAuth(app);

  // Do not store firebase auth
  auth.setPersistence(inMemoryPersistence);

  return auth;
}

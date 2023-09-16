import { building } from '$app/environment';
import { cleanEnv, str } from 'envalid';

function setupEnv() {
  return cleanEnv(process.env, {
    LOG_LEVEL: str({
      choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
      default: 'info',
      desc: 'The minimum level to log'
    }),
    COOKIE_SIGNING_SECRET: str({
      default: 'not-a-secret'
    }),
    SELF_DOMAIN: str({
      default: 'localhost'
    }),
    ORIGIN: str({
      default: 'http://localhost:3000'
    }),
    FIREBASE_API_KEY: str({
      default: 'AIzaSyCRAYKK0rXOHYicqT1cCKrTD3aITSb5Xu4'
    }),
    FIREBASE_AUTH_DOMAIN: str({
      default: 'klyngeorg-eventorg.firebaseapp.com'
    }),
    GOOGLE_PROJECT_ID: str({
      default: 'klyngeorg-eventorg'
    })
  });
}

export type Config = ReturnType<typeof setupEnv>;

export function createConfig(): Config {
  if (building) {
    return {} as unknown as Config;
  }

  return setupEnv();
}

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

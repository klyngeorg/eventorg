import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { writeSessionToCookies } from '$lib/auth/session';

export const GET: RequestHandler = async ({ cookies }) => {
  writeSessionToCookies(cookies, '1234', 'not-a-secret');
  return json({
    message: 'Hello world!'
  });
};

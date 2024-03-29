import { z } from 'zod';
import { pbkdf2, randomUUID } from 'node:crypto';
import type { Firestore } from '@google-cloud/firestore';
import type { Cookies } from '@sveltejs/kit';
import { sign, unsign } from './signer';

const sessionType = z.object({
  userId: z.string(),
  expiresAt: z.date()
});

type Session = z.infer<typeof sessionType> & { id: string };
type CreateSession = z.infer<typeof sessionType>;

async function getSessionFromDatabase(
  firestore: Firestore,
  sessionId: string
): Promise<null | Session> {
  const sessionDoc = await firestore.collection('sessions').doc(sessionId).get();
  if (!sessionDoc.exists) {
    return null;
  }

  const data = sessionDoc.data();

  if (!data) {
    return null;
  }

  const session = sessionType.parse({
    userId: data.userId,
    expiresAt: data.expiresAt.toDate()
  });

  return {
    id: sessionDoc.id,
    ...session
  };
}

function generateSessionId(authSignSecret: string): Promise<string> {
  const iteration = 500;
  const keylength = 24;
  const digest = 'sha1';
  return new Promise<string>((resolve, reject) =>
    pbkdf2(randomUUID(), authSignSecret, iteration, keylength, digest, (err, key) => {
      if (err) {
        return reject(err);
      }
      resolve(key.toString('hex'));
    })
  );
}

async function createSessionInDatabase(
  firestore: Firestore,
  userId: string,
  authSignSecret: string,
  expiresAt: Date
): Promise<Session> {
  const sessionId = await generateSessionId(authSignSecret);
  const session = {
    userId,
    expiresAt
  } satisfies CreateSession;
  await firestore.collection('sessions').doc(sessionId).set(session);
  return {
    id: sessionId,
    ...session
  };
}

function readSessionIdFromCookies(cookies: Cookies, authSignSecret: string) {
  const encryptedSessionId = cookies.get('eventorg-session-id');
  if (!encryptedSessionId) {
    return null;
  }

  const result = unsign(encryptedSessionId, authSignSecret);

  if (!result.valid) {
    return null;
  }

  return result.value;
}
export function writeSessionToCookies(
  cookies: Cookies,
  sessionId: string,
  authSignSecret: string,
  expiresAt: Date,
  domain?: string
) {
  const encryptedSessionId = sign(sessionId, authSignSecret);
  cookies.set('eventorg-session-id', encryptedSessionId, {
    domain,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: expiresAt
  });
}

function deleteSessionFromCookies(cookies: Cookies) {
  cookies.delete('eventorg-session-id', {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });
}

export async function createSession(
  firestore: Firestore,
  cookies: Cookies,
  userId: string,
  authSignSecret: string,
  domain?: string
) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days
  const sessionData = await createSessionInDatabase(firestore, userId, authSignSecret, expiresAt);
  writeSessionToCookies(cookies, sessionData.id, authSignSecret, expiresAt, domain);
}

export async function deleteSession(
  firestore: Firestore,
  cookies: Cookies,
  authSignSecret: string
) {
  const sessionId = readSessionIdFromCookies(cookies, authSignSecret);
  if (!sessionId) {
    return null;
  }

  await firestore.collection('sessions').doc(sessionId).delete();
  deleteSessionFromCookies(cookies);
}

export async function getSession(firestore: Firestore, cookies: Cookies, authSignSecret: string) {
  const sessionId = readSessionIdFromCookies(cookies, authSignSecret);
  if (!sessionId) {
    return null;
  }

  const session = await getSessionFromDatabase(firestore, sessionId);
  if (!session) {
    deleteSessionFromCookies(cookies);
    return null;
  }

  return session;
}

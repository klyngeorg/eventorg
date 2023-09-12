import { Firestore } from '@google-cloud/firestore';

export function createFirestoreClient(): Firestore {
  return new Firestore();
}

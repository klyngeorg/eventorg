import { Firestore } from '@google-cloud/firestore';

export function createFirestoreClient(projectId: string): Firestore {
  return new Firestore({
    projectId
  });
}

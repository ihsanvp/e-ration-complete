import { getFirebaseAdminAuth } from './firebase';

export async function getFirebaseUserWithId(credential: string, id: string) {
  const auth = getFirebaseAdminAuth(credential);
  const user = await auth.getUser(id);
  if (!user) {
    return null;
  }
  return user;
}

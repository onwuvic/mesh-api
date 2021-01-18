import * as admin from "firebase-admin";
import * as serviceAccount from '../../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://construyo-coding-challenge.firebaseio.com'
})

export const db = admin.firestore();
export const auth = admin.auth();

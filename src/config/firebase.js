import * as admin from "firebase-admin";
import dotenv from 'dotenv';
import FirestoreMock from 'firestore-mock';

dotenv.config();

export const config = {
  projectType: process.env.PROJECT_TYPE,
  projectId: process.env.PROJECT_ID,
  privateKeyId: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.CLIENT_EMAIL,
  clientId: process.env.CLIENT_ID,
  authURI: process.env.AUTH_URI,
  tokenURI: process.env.TOKEN_URI,
  authProviderCertURL: process.env.AUTH_PROVIDER_CERT_URL,
  clientCertURL: process.env.CLIENT_CERT_URL
};

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: process.env.DATABASE_URL
})

export const db = process.env.NODE_ENV === 'test' ? new FirestoreMock() : firebase.firestore();

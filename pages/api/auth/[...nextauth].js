import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { FirebaseAdapter } from "@next-auth/firebase-adapter"

import firebase from "firebase/app"
import "firebase/firestore"

const firestore = (
  firebase.apps[0] ?? firebase.initializeApp(
    {apiKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,                             // Auth / General Use
    appId: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID,              // General Use
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,               // General Use
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // Realtime Database
      }  )
).firestore()

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    }),
  ],
  adapter: FirebaseAdapter(firestore),
})
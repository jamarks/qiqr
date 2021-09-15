import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { FirebaseAdapter } from "@next-auth/firebase-adapter"

import firebase from "firebase/app"
import "firebase/firestore"
import db from '../../../utils/db';

const axios = require('axios');


const firebaseConfig = {
  apiKey: "AIzaSyA3YA2qG8PdhjOPrIbEZHrDv76s0PEMJKw",
  authDomain: "qrme-65ff2.firebaseapp.com",
  projectId: "qrme-65ff2",
  storageBucket: "qrme-65ff2.appspot.com",
  messagingSenderId: "241124779446",
  appId: "1:241124779446:web:7ca861102426b51ee10d17",
  measurementId: "G-ZK1E5GP878"
};

const firestore = (
  firebase.apps[0] ?? firebase.initializeApp(firebaseConfig)
).firestore()


const getLinkedInEmail = async (accessToken) => {
  // console.log('Inicio de la llamada')
  try {

    var response = await
      axios
        .get(
          `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=${accessToken}`
        )

    return (response.data.elements[0]["handle~"].emailAddress)
    // .then(
    //   (response) =>
    //     response.data.elements[0]["handle~"].emailAddress
    // )
    // .then((response) => {
    //   console.log('Resuelve la llamada')
    //   console.log('EMAIL > ' + response)
    //   return(response)
    // } )
    // .catch((e) => e);
  } catch (e) {
    return (e);
  }
};

const getLinkedInPhoto = async (accessToken) => {
  try {

    var response = await axios
      .get(
        `https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))&oauth2_access_token=${accessToken}`
      )

    return (response.data.profilePicture["displayImage~"].elements[0].identifiers[0].identifier)
    // .then(
    //   (response) =>
    //     response.data.profilePicture["displayImage~"].elements[0].identifiers[0].identifier
    // )
    // .then((response) => {
    //   console.log('IMAGE > ' + response)
    //   return(response)
    // } )
    // .catch((e) => e);
  } catch (e) {
    return e;
  }
};


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers



  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    }),
    // Providers.LinkedIn({
    //   clientId: process.env.LINKEDIN_CLIENT_ID,
    //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    //   scope: "r_liteprofile,r_emailaddress",

    //   // profileUrl: 'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))',

    //   // async profile(prof, tokens) {
    //   //   const { accessToken } = tokens;
    //   //   console.log('----- PROFILE -----')
    //   //   // console.log(prof)
    //   //   // console.log('Llamada a busqueda de Email')
    //   //   const linkedinEmail = await getLinkedInEmail(accessToken)
    //   //   console.log('Linkedin Email: ' + linkedinEmail)
    //   //   // console.log('Salida a busqueda de Email')
    //   //   // console.log("LinkedinEmail > " + linkedinEmail)
    //   //   // console.log('Llamada a busqueda de Photo')
    //   //   const linkedinPhoto = await getLinkedInPhoto(accessToken)
    //   //   // console.log('Salida a busqueda de Photo')
    //   //   console.log('Linkedin Photo: ' + linkedinPhoto)

    //   //   console.log('----- !PROFILE -----')


    //   //   return {
    //   //     id: prof.id, 
    //   //     name: prof.localizedFirstName + ' ' + prof.localizedLastName,
    //   //     email: linkedinEmail,
    //   //     image: linkedinPhoto,
    //   //   };
    //   // },
    // }),
  ],
  //database: process.env.POSTGRES_URL,
  adapter: FirebaseAdapter(firestore),
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: false,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: 'dsgkjdfg$#dfgh3dSFGtjdfhg#$sGsdfkgjdfg',
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    newUser: '/admin',

    signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {

    async signIn(user, account, profile) {
      console.log('----- SIGN IN ----- Profile')
      console.log(profile)
      console.log('----- SIGN IN ----- User')
      console.log(user)
      console.log('----- SIGN IN ----- Account')
      console.log(account)
      console.log('----- FIN SIGN IN -----')

      var userId = user.id
      console.log('userID : ' + userId)
      var accessToken = ''
      var email = ''
      var photo = ''
      var userName = ''
      
      // Si no es Linkedin no deberia entrar aca. 
      switch (account.provider) {
        case 'linkedin': 
          accessToken = account.accessToken
          email = await getLinkedInEmail(accessToken)
          photo = await getLinkedInPhoto(accessToken)
          userName = profile.localizedFirstName + ' ' + profile.localizedLastName

          console.log('Linkedin accesToken : ' + accessToken)
          console.log('Linkedin Name:' + userName)
          console.log('Linkedin Photo: ' + photo)
          console.log('Linkedin Email: ' + email)

          break;
        case 'google': 
          accessToken = account.accessToken
          email = user.email
          photo = user.image
          userName = user.name

          console.log('Google accesToken : ' + accessToken)
          console.log('Google Name: ' + userName)
          console.log('Google Photo: ' + photo)
          console.log('Google Email: ' + email)

        break;
        case 'twitter': 
          accessToken = account.accessToken
          email = user.email
          photo = user.image
          userName = user.name

          console.log('Twitter accesToken : ' + accessToken)
          console.log('Twitter Name: ' + userName)
          console.log('Twitter Photo: ' + photo)
          console.log('Twitter Email: ' + email)

        break;
        // default: {
        //   accessToken = ''
        //   email = ''
        //   photo = ''
        //   userName = ''
        // }
      }
      console.log('Entra al fetch')
      const res = await fetch(process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL + '/api/data/user/newUser',
        {
          body: JSON.stringify({ userId: userId, name: userName, email: email, photo: photo, }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST'
        }
      )
      //const result = await res.json()
      //console.log(result)

      return true

    }

    // async redirect(url, baseUrl) { return baseUrl },
    // async session(session, user) { return session },
    // async jwt(token, user, account, profile, isNewUser) { return token }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  //events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: 'light',

  // Enable debug messages in the console if you are having problems
  debug: true,
})
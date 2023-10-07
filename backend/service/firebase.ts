"use client";

import { Auth, getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN } from "@/utilities/constants";

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
};

/**
 * Initialize Firebase auth
 * @returns {Auth} - the auth object
 */
export const initAuth = (): Auth => {
  const authApp = firebase.initializeApp(config);
  const auth = getAuth(authApp);
  return auth;
};

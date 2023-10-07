// Website constants
export const SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL || "";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Firebase auth constants
export const FIREBASE_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_API_KEY || "";
export const FIREBASE_AUTH_DOMAIN =
  process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_AUTH_DOMAIN || "";
export const FIREBASE_PROJECT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLOUD_PROJECT_ID || "";

// Google maps
export const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export const PUBLIC_ROUTES = [
  "/forbiden",
  "/signin",
  "/forgot-password",
  "/new-password",
  "/activation",
];

export enum LocalUrl {
  HOME = "/",
  CREATE_EVENT = "/events/create",
  FIND_EVENTS = "/events",
  LOG_IN = "/login",
  SIGN_UP = "/signup",
  SIGN_OUT = "/signout",
  FORBIDDEN = "/forbidden",
  FORGOT_PASSWORD = "/forgot-password",
  USER_PROFILE = "/account/profile",
}

interface MenuItem {
  name: string;
  url: LocalUrl;
}

export const MENU_ITEMS = [
  {
    name: "Find Events",
    url: LocalUrl.FIND_EVENTS,
  },
  {
    name: "Create Event",
    url: LocalUrl.CREATE_EVENT,
  },
];

export const AUTH_MENU_ITEMS: MenuItem[] = [
  {
    name: "Log In",
    url: LocalUrl.LOG_IN,
  },
  {
    name: "Sign Up",
    url: LocalUrl.SIGN_UP,
  },
];

export const BANNER_IMAGES: string[] = [
  "/assets/images/banner-one.png",
  "/assets/images/banner-two.png",
  "/assets/images/banner-one.png",
  "/assets/images/banner-two.png",
  "/assets/images/banner-one.png",
  "/assets/images/banner-two.png",
];

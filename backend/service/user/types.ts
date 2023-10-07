import { User as FirebaseUser } from "firebase/auth";

import { Language, Platform, Unauthorized } from "@/types/services";

import { ApiValidationError } from "../types";

// GLOBAL
interface ProviderData {
  uid: string;
  provider_id: string;
  email: string;
  display_name: string | null;
  photo_url: string | null;
}

export interface Permission {
  actor: number;
  env: number;
  scope: {
    name: number;
    resources: string[] | null;
  };
}

export interface UserUnauthorized extends Unauthorized {
  required_permissions: Permission[];
  required_roles: string[];
  user_permissions: Permission[];
  unauthorized_ids: string[];
}

export interface User {
  uid: string;
  provider_data: ProviderData[];
  provider_id: string;
  tenant_id: string | null;
  tokens_valid_after_timestamp: number;
  creation_timestamp: number;
  last_refresh_timestamp: number | null;
  last_sign_in_timestamp: number | null;
  first_name: string;
  last_name: string;
  language: Language;
  photo_url: string | null;
  phone_number: string | null;
  email: string;
  platform: Platform;
  permissions: Permission[];
  disabled: boolean;
  email_verified: boolean;
  is_internal: boolean;
  created_at: string | null;
  created_by: string | null;
  updated_at: string | null;
  updated_by: string | null;
  roles: string[];
  manufacturer_ids?: string[] | null;
}

// CREATE USER
export interface CreateUserBody {
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string | null;
  photo_url?: string | null;
  language: Language;
  platform: Platform;
  permissions: Permission[];
}

export interface CreateUserParams {
  inviter_name?: string;
}

export type CreateUserResponseApi =
  | CreatedUser
  | UserUnauthorized
  | ApiValidationError;

interface CreatedUser extends User {
  api_key: string;
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  user: CreatedUser | null;
}

// USE CURRENT USER
export interface UseCurrentUser {
  currentUser: User | null;
  currentUserLoading: boolean;
  currentUserError: string;
  firebaseUser: FirebaseUser | null;
  firebaseUserLoading: boolean;
}

// GET USER
export type GetUserResponseApi = User | UserUnauthorized | ApiValidationError;

export interface GetUserResponse {
  success: boolean;
  message: string;
  user: User | null;
}

// GET USERS
export interface GetUsersFilteredBody {
  permissions: Permission[] | null;
  email: string | null;
  roles: string[] | null;
  resources: string[] | null;
  is_internal: boolean | null;
  show_inactive: boolean | null;
}

export type GetUsersResponseApi =
  | User[]
  | UserUnauthorized
  | ApiValidationError;

export interface GetUsersResponse {
  success: boolean;
  message: string;
  users: User[];
  total: number;
}

// UPDATE USER
export interface UpdateUserBody {
  uid: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string | null;
  photo_url?: string | null;
  platform?: Platform;
  language?: Language;
  permissions?: Permission[];
}

export type UpdateUserResponseApi =
  | User
  | UserUnauthorized
  | ApiValidationError;

export interface UpdateUserResponse {
  success: boolean;
  message: string;
  user: User | null;
}

// DELETE USER
export interface DeleteUserParams {
  uid: string;
}

export type DeleteUserResponseApi = UserUnauthorized | ApiValidationError;

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}

// USER API URLS
export enum UserUrl {
  CREATE = "/api/v2/users",
  GET_BY_UID = "/api/v2/users/",
  GET = "/api/v2/users",
  GET_FILTERED = "/api/v2/users/filtered",
  UPDATE = "/api/v2/users",
  DELETE = "/api/v2/users",
}

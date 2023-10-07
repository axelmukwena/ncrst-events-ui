import { Language } from "@/types/services";

import { ApiValidationError } from "../types";
import { UserUnauthorized } from "../user/types";

// UPDATE PROFILE
export interface UpdateProfileBody {
  uid: string;
  first_name?: string | null;
  last_name?: string | null;
  phone_number?: string | null;
  photo_url?: string | null;
  language?: Language | null;
}

export type UpdateProfileResponseApi = UserUnauthorized | ApiValidationError;

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
}

// REVOKE API KEY
export interface RevokeApiKeyBody {
  uid: string;
}

export type RevokedApiKey = {
  api_key: string | null;
};

export interface RevokeApiKeyResponse extends RevokedApiKey {
  success: boolean;
  message: string;
}

export type RevokeApiKeyResponseApi =
  | RevokedApiKey
  | UserUnauthorized
  | ApiValidationError;

// SET PASSWORD
export interface SetPasswordBody {
  password: string;
  token: string;
}

export interface SetPasswordResponse {
  success: boolean;
  message: string;
}

export type SetPasswordResponseApi = UserUnauthorized | ApiValidationError;

// RESET PASSWORD
export interface ResetPasswordBody {
  email: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export type ResetPasswordResponseApi = UserUnauthorized | ApiValidationError;

export enum ProfileUrl {
  UPDATE_PROFILE = "/api/v2/profile/set-profile",
  REVOKE_API_KEY = "/api/v2/profile/revoke-api-key",
  SET_PASSWORD = "/api/v2/profile/set-password",
  REQUEST_RESET_PASSWORD = "/api/v2/profile/request-reset-password",
}

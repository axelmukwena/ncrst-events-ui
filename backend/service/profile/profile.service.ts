import { ApiService } from "@/backend/service";
import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";

import {
  ProfileUrl,
  RevokeApiKeyBody,
  RevokeApiKeyResponse,
  RevokeApiKeyResponseApi,
  UpdateProfileBody,
  UpdateProfileResponse,
  UpdateProfileResponseApi,
} from "./types";

/**
 * A service to interact with the profile API.
 */
export class ProfileService extends ApiService {
  /**
   * Update the profile.
   * @param {UpdateProfileBody} data - the profile data
   * @returns {Promise<UpdateProfileResponse>} - the profile response
   */
  async update(data: UpdateProfileBody): Promise<UpdateProfileResponse> {
    try {
      const res = await this.api.patch<UpdateProfileResponseApi>(
        ProfileUrl.UPDATE_PROFILE,
        data
      );

      if (res.status === 200) {
        return {
          success: true,
          message: "Profile updated successfully",
        };
      }

      if (
        "required_permissions" in res.data &&
        "title" in res.data &&
        "description" in res.data
      ) {
        return {
          success: false,
          message: `User Unauthorized: ${res.data.title} - ${res.data.description}`,
        };
      }

      if ("detail" in res.data) {
        const messages = res.data.detail.map((error) => {
          if (typeof error === "string") {
            return error;
          }
          return error.msg;
        });
        return {
          success: false,
          message: `User update failed: ${messages.join(" - ")}`,
        };
      }

      return {
        success: false,
        message: "Request Error. Please contact support.",
      };
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to update profile: ${message}`,
      };
    }
  }

  /**
   * Revoke the API Key.
   * @param {RevokeApiKeyBody} data - the API Key data
   * @returns {Promise<RevokeApiKeyResponse>} - the API Key response
   */
  async revokeApiKey(data: RevokeApiKeyBody): Promise<RevokeApiKeyResponse> {
    try {
      const res = await this.api.post<RevokeApiKeyResponseApi>(
        ProfileUrl.REVOKE_API_KEY,
        data
      );

      if (res.status === 200 && "api_key" in res.data) {
        return {
          success: true,
          message: "API Key revoked successfully",
          api_key: res.data.api_key,
        };
      }

      if (
        "required_permissions" in res.data &&
        "title" in res.data &&
        "description" in res.data
      ) {
        return {
          success: false,
          message: `User Unauthorized: ${res.data.title} - ${res.data.description}`,
          api_key: null,
        };
      }

      if ("detail" in res.data) {
        const messages = res.data.detail.map((error) => {
          if (typeof error === "string") {
            return error;
          }
          return error.msg;
        });
        return {
          success: false,
          message: `API Key revoke failed: ${messages.join(" - ")}`,
          api_key: null,
        };
      }

      return {
        success: false,
        message: "Request Error. Please contact support.",
        api_key: null,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to revoke API Key: ${message}`,
        api_key: null,
      };
    }
  }
}

import axios, { AxiosInstance } from "axios";

import { API_BASE_URL } from "@/utilities/constants";
import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";

import {
  ProfileUrl,
  ResetPasswordBody,
  ResetPasswordResponse,
  ResetPasswordResponseApi,
  SetPasswordBody,
  SetPasswordResponse,
  SetPasswordResponseApi,
} from "./types";

/**
 * A service to interact with the fetcher API.
 * @constructor {string} token - the token to authenticate with
 * @throws {Error} - if the token is not initialized
 */
class ProfileNoAuthService {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  /**
   * Request to reset the password.
   * @param {ResetPasswordBody} data - the password data
   * @returns {Promise<ResetPasswordResponse>} - the password response
   */
  async requestResetPassword(
    data: ResetPasswordBody
  ): Promise<ResetPasswordResponse> {
    try {
      const res = await this.api.post<ResetPasswordResponseApi>(
        ProfileUrl.REQUEST_RESET_PASSWORD,
        data
      );

      if (res.status === 200) {
        return {
          success: true,
          message: "Password reset successfully",
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
          message: `Password reset failed: ${messages.join(" - ")}`,
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
        message: `Failed to reset the password: ${message}`,
      };
    }
  }

  /**
   * Set a new password.
   * @param {SetPasswordBody} data - the password data
   * @returns {Promise<SetPasswordResponse>} - the password response
   */
  async setNewPassword(data: SetPasswordBody): Promise<SetPasswordResponse> {
    try {
      const res = await this.api.patch<SetPasswordResponseApi>(
        ProfileUrl.SET_PASSWORD,
        data
      );

      if (res.status === 200) {
        return {
          success: true,
          message: "Password set successfully",
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
          message: `Setting password failed: ${messages.join(" - ")}`,
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
        message: `Failed to set password: ${message}`,
      };
    }
  }
}

export default ProfileNoAuthService;

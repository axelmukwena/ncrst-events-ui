import { ApiService } from "@/backend/service";
import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";

import { GetAnyResponse } from "./types";

/**
 * A service to interact with the utility API.
 */
export class UtilityService extends ApiService {
  /**
   * Get the data from
   * @param {string} url - the url to fetch from
   * @returns {Promise<GetResponse>} - the data
   */
  async getAny(url: string): Promise<GetAnyResponse> {
    try {
      const res = await this.api.get<any>(url);
      if (res.status === 200) {
        return {
          success: true,
          message: "Data fetched successfully",
          data: res.data,
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
          data: null,
        };
      }

      return {
        success: false,
        message: "Request Error. Please contact support.",
        data: null,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to fetch data: ${message}`,
        data: null,
      };
    }
  }
}

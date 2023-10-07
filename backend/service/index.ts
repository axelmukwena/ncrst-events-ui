import axios, { AxiosInstance } from "axios";

import { API_BASE_URL } from "@/utilities/constants";

/**
 * A service to interact with the API.
 * @constructor {string} token - the token to authenticate with
 * @throws {Error} - if the token is not initialized
 */
export class ApiService {
  protected api: AxiosInstance;

  constructor(token: string) {
    if (!token) {
      throw new Error("User is not authenticated");
    }

    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      validateStatus() {
        return true;
      },
    });
  }
}

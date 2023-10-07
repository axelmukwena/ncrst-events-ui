import { ApiService } from "@/backend/service";
import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";
import { sortUsersByFirstName } from "@/utilities/helpers/sortUsersByFirstName";

import { GetManyParams } from "../types";
import {
  CreateUserBody,
  CreateUserParams,
  CreateUserResponse,
  CreateUserResponseApi,
  DeleteUserParams,
  DeleteUserResponse,
  DeleteUserResponseApi,
  GetUserResponse,
  GetUserResponseApi,
  GetUsersFilteredBody,
  GetUsersResponse,
  GetUsersResponseApi,
  UpdateUserBody,
  UpdateUserResponse,
  UpdateUserResponseApi,
  UserUrl,
} from "./types";

/**
 * A service to interact with the user API.
 */
export class UserService extends ApiService {
  /**
   * Get many users.
   * @param {GetManyParams} params - the query parameters
   * @returns {Promise<GetUsersResponse>} - the users response
   */
  async getMany(params: GetManyParams): Promise<GetUsersResponse> {
    try {
      const res = await this.api.get<GetUsersResponseApi>(UserUrl.GET, {
        params,
      });

      if (res.status === 200 && Array.isArray(res.data)) {
        return {
          success: true,
          message: "Users fetched successfully",
          users: sortUsersByFirstName(res.data),
          total: Number(res.headers["x-total-count"]),
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
          users: [],
          total: 0,
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
          message: `Fetching users failed: ${messages.join(" - ")}`,
          users: [],
          total: 0,
        };
      }

      return {
        success: false,
        message: "Request Error. Please contact support.",
        users: [],
        total: 0,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to fetch users: ${message}`,
        users: [],
        total: 0,
      };
    }
  }

  /**
   * Get many users with a filter.
   * @param {GetUsersFilteredBody} query - the query parameters
   * @param {GetManyParams} params - the query parameters
   * @returns {Promise<GetUsersResponse>} - the users response
   */
  async getManyFiltered(
    query: GetUsersFilteredBody,
    params: GetManyParams
  ): Promise<GetUsersResponse> {
    try {
      const res = await this.api.post<GetUsersResponseApi>(
        UserUrl.GET_FILTERED,
        query,
        { params }
      );

      if (res.status === 200 && Array.isArray(res.data)) {
        return {
          success: true,
          message: "Users fetched successfully",
          users: sortUsersByFirstName(res.data),
          total: Number(res.headers["x-total-count"]),
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
          users: [],
          total: 0,
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
          message: `Fetching users failed: ${messages.join(" - ")}`,
          users: [],
          total: 0,
        };
      }

      return {
        success: false,
        message: "Request Error. Please contact support.",
        users: [],
        total: 0,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to fetch users: ${message}`,
        users: [],
        total: 0,
      };
    }
  }

  /**
   * Get a user by their UID.
   * @param {string} uid - the user's UID
   * @returns {Promise<UserResponse>} - the user response
   */
  async getByUid(uid: string): Promise<GetUserResponse> {
    if (!uid) {
      return {
        success: false,
        message: "Failed to fetch user: uid is required",
        user: null,
      };
    }

    try {
      const res = await this.api.get<GetUserResponseApi>(
        `${UserUrl.GET_BY_UID}${uid}`
      );
      if (res.status === 200 && "uid" in res.data && "email" in res.data) {
        return {
          success: true,
          message: "User fetched successfully",
          user: res.data,
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
          user: null,
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
          message: `Fetching user failed: ${messages.join(" - ")}`,
          user: null,
        };
      }

      return {
        success: false,
        message: "Request Error. Please contact support.",
        user: null,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to fetch user: ${message}`,
        user: null,
      };
    }
  }

  /**
   * Create a user.
   * @param {CreateUserBody} data - the user data
   * @param {CreateUserParams} params - the query parameters
   */
  async create(
    data: CreateUserBody,
    params: CreateUserParams
  ): Promise<CreateUserResponse> {
    try {
      const res = await this.api.post<CreateUserResponseApi>(
        UserUrl.CREATE,
        data,
        {
          params,
        }
      );

      if (res.status === 200 && "uid" in res.data && "email" in res.data) {
        return {
          success: true,
          message: "User created successfully",
          user: res.data,
        };
      }

      if (
        "required_permissions" in res.data &&
        "title" in res.data &&
        "description" in res.data
      ) {
        return {
          success: false,
          message: `User Unauthorized: ${res.data.title}`,
          user: null,
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
          message: `User creation failed: ${messages.join(" - ")}`,
          user: null,
        };
      }

      return {
        success: false,
        message: "Request Error. Please contact support.",
        user: null,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to create user: ${message}`,
        user: null,
      };
    }
  }

  /**
   * Update a user.
   * @param {UpdateUserBody} data - the user data
   * @returns {Promise<UpdateUserResponse>} - the user response
   */
  async update(data: UpdateUserBody): Promise<UpdateUserResponse> {
    try {
      const res = await this.api.put<UpdateUserResponseApi>(
        UserUrl.UPDATE,
        data
      );

      if (res.status === 200 && "uid" in res.data && "email" in res.data) {
        return {
          success: true,
          message: "User updated successfully",
          user: res.data,
        };
      }

      if (
        "required_permissions" in res.data &&
        "title" in res.data &&
        "description" in res.data
      ) {
        return {
          success: false,
          message: `User Unauthorized: ${res.data.title}`,
          user: null,
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
          user: null,
        };
      }

      return {
        success: false,
        message: "Request Error. Please contact support.",
        user: null,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to update user: ${message}`,
        user: null,
      };
    }
  }

  /**
   * Delete a user.
   * @param {string} uid - the user's UID
   * @returns {Promise<DeletedUserResponse>} - the user response
   */
  async delete(params: DeleteUserParams): Promise<DeleteUserResponse> {
    try {
      const res = await this.api.delete<DeleteUserResponseApi>(UserUrl.DELETE, {
        params,
      });

      if (res.status === 200) {
        return {
          success: true,
          message: "User deleted successfully",
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
          message: `Deleting user failed: ${messages.join(" - ")}`,
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
        message: `Failed to delete user: ${message}`,
      };
    }
  }
}

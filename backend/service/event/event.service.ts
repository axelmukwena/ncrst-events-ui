import { ApiService } from "@/backend/service";
import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";

import { GetManyEventsParams } from "../types";
import {
  CreateEventBody,
  CreateEventParams,
  CreateEventResponse,
  CreateEventResponseApi,
  DeleteEventParams,
  DeleteEventResponse,
  DeleteEventResponseApi,
  EventUrl,
  GetEventResponse,
  GetEventResponseApi,
  GetEventsResponse,
  GetEventsResponseApi,
  UpdateEventBody,
  UpdateEventResponse,
  UpdateEventResponseApi,
} from "./types";

/**
 * A service to interact with the event API.
 */
export class EventService extends ApiService {
  /**
   * Get many events.
   * @param {GetManyEventsParams} params - the query parameters
   * @returns {Promise<GetEventsResponse>} - the events response
   */
  async getMany(params: GetManyEventsParams): Promise<GetEventsResponse> {
    try {
      const res = await this.api.get<GetEventsResponseApi>(EventUrl.GET, {
        params,
      });

      if (res.status === 200 && Array.isArray(res.data)) {
        return {
          success: true,
          message: "Events fetched successfully",
          events: res.data,
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
          message: `Event Unauthorized: ${res.data.title} - ${res.data.description}`,
          events: [],
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
          message: `Fetching events failed: ${messages.join(" - ")}`,
          events: [],
          total: 0,
        };
      }

      return {
        success: false,
        message: "Request Error. Please contact support.",
        events: [],
        total: 0,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to fetch events: ${message}`,
        events: [],
        total: 0,
      };
    }
  }

  /**
   * Get a event by their UID.
   * @param {string} uid - the event's UID
   * @returns {Promise<EventResponse>} - the event response
   */
  async getBySlug(slug: string): Promise<GetEventResponse> {
    if (!slug) {
      return {
        success: false,
        message: "Failed to fetch event: uid is required",
        event: null,
      };
    }

    try {
      const res = await this.api.get<GetEventResponseApi>(
        `${EventUrl.GET_BY_SLUG}${slug}`
      );
      if (res.status === 200 && "uid" in res.data) {
        return {
          success: true,
          message: "Event fetched successfully",
          event: res.data,
        };
      }

      if (
        "required_permissions" in res.data &&
        "title" in res.data &&
        "description" in res.data
      ) {
        return {
          success: false,
          message: `Event Unauthorized: ${res.data.title} - ${res.data.description}`,
          event: null,
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
          message: `Fetching event failed: ${messages.join(" - ")}`,
          event: null,
        };
      }

      return {
        success: false,
        message: "Request Error. Please contact support.",
        event: null,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to fetch event: ${message}`,
        event: null,
      };
    }
  }

  /**
   * Create a event.
   * @param {CreateEventBody} data - the event data
   * @param {CreateEventParams} params - the query parameters
   */
  async create(
    data: CreateEventBody,
    params: CreateEventParams
  ): Promise<CreateEventResponse> {
    try {
      const res = await this.api.post<CreateEventResponseApi>(
        EventUrl.CREATE,
        data,
        {
          params,
        }
      );

      if (res.status === 200 && "uid" in res.data) {
        return {
          success: true,
          message: "Event created successfully",
          event: res.data,
        };
      }

      if (
        "required_permissions" in res.data &&
        "title" in res.data &&
        "description" in res.data
      ) {
        return {
          success: false,
          message: `Event Unauthorized: ${res.data.title}`,
          event: null,
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
          message: `Event creation failed: ${messages.join(" - ")}`,
          event: null,
        };
      }

      return {
        success: false,
        message: "Request Error. Please contact support.",
        event: null,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to create event: ${message}`,
        event: null,
      };
    }
  }

  /**
   * Update a event.
   * @param {UpdateEventBody} data - the event data
   * @returns {Promise<UpdateEventResponse>} - the event response
   */
  async update(data: UpdateEventBody): Promise<UpdateEventResponse> {
    try {
      const res = await this.api.put<UpdateEventResponseApi>(
        EventUrl.UPDATE,
        data
      );

      if (res.status === 200 && "uid" in res.data) {
        return {
          success: true,
          message: "Event updated successfully",
          event: res.data,
        };
      }

      if (
        "required_permissions" in res.data &&
        "title" in res.data &&
        "description" in res.data
      ) {
        return {
          success: false,
          message: `Event Unauthorized: ${res.data.title}`,
          event: null,
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
          message: `Event update failed: ${messages.join(" - ")}`,
          event: null,
        };
      }

      return {
        success: false,
        message: "Request Error. Please contact support.",
        event: null,
      };
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to update event: ${message}`,
        event: null,
      };
    }
  }

  /**
   * Delete a event.
   * @param {DeleteEventParams} params - the query parameters
   * @returns {Promise<DeletedEventResponse>} - the event response
   */
  async delete(params: DeleteEventParams): Promise<DeleteEventResponse> {
    try {
      const res = await this.api.delete<DeleteEventResponseApi>(
        EventUrl.DELETE,
        {
          params,
        }
      );

      if (res.status === 200) {
        return {
          success: true,
          message: "Event deleted successfully",
        };
      }

      if (
        "required_permissions" in res.data &&
        "title" in res.data &&
        "description" in res.data
      ) {
        return {
          success: false,
          message: `Event Unauthorized: ${res.data.title} - ${res.data.description}`,
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
          message: `Deleting event failed: ${messages.join(" - ")}`,
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
        message: `Failed to delete event: ${message}`,
      };
    }
  }
}

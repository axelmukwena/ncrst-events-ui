import { testEvents } from "@/tests/testConstants/events";

import { GetEventResponse, GetEventsResponse } from "../service/event/types";

export const mockSearchEventByTitle = (
  title: string
): Promise<GetEventsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const events = testEvents.filter((item) =>
        item.title.toLowerCase().includes(title.toLowerCase())
      );
      const response: GetEventsResponse = {
        success: true,
        message: "",
        events,
        total: events.length,
      };
      resolve(response);
    }, 1000);
  });

export const mockGetEventBySlug = (slug: string): Promise<GetEventResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const event = testEvents.find((item) => item.slug === slug);
      const response: GetEventResponse = {
        success: !!event,
        message: "",
        event: event || null,
      };
      resolve(response);
    }, 1000);
  });

export const mockGetEvents = (): Promise<GetEventsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const response: GetEventsResponse = {
        success: true,
        message: "",
        events: testEvents,
        total: testEvents.length,
      };
      resolve(response);
    }, 1000);
  });

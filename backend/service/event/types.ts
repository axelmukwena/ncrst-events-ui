import { Language, Platform } from "@/types/services";

import { ApiValidationError } from "../types";

interface TicketInfo {
  price: number;
  availability: number;
  sale_start_date: number;
  sale_end_date: number;
}

interface Image {
  url: string;
  alt: string;
}

interface Location {
  address: string;
  lat?: number;
  lng?: number;
}

interface ContactInfo {
  name: string;
  email?: string;
  phone?: string;
  institution: string;
  designation: string;
}

export interface Event {
  uid: string;
  title: string;
  slug: string;
  description: string;
  start_date: number;
  end_date: number;
  categories: string[];
  time: string;
  contact: ContactInfo;
  target_audience: string[];
  participant_count: number;
  preregistration_required: boolean;
  organizer: string;
  resources_invested: string;
  budgeted: boolean;
  funding: string;
  primary_image: Image;
  images: Image[];
  location: Location;
  ticket_info: TicketInfo;
  tags: string[];
}

// CREATE EVENT
export interface CreateEventBody {
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string | null;
  photo_url?: string | null;
  language: Language;
  platform: Platform;
}

export interface CreateEventParams {
  inviter_name?: string;
}

export type CreateEventResponseApi = CreatedEvent | ApiValidationError;

interface CreatedEvent extends Event {
  api_key: string;
}

export interface CreateEventResponse {
  success: boolean;
  message: string;
  event: CreatedEvent | null;
}

// GET EVENT
export type GetEventResponseApi = Event | ApiValidationError;

export interface GetEventResponse {
  success: boolean;
  message: string;
  event: Event | null;
}

export type GetEventsResponseApi = Event[] | ApiValidationError;

export interface GetEventsResponse {
  success: boolean;
  message: string;
  events: Event[];
  total: number;
}

// UPDATE EVENT
export interface UpdateEventBody {
  uid: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string | null;
  photo_url?: string | null;
  platform?: Platform;
  language?: Language;
}

export type UpdateEventResponseApi = Event | ApiValidationError;

export interface UpdateEventResponse {
  success: boolean;
  message: string;
  event: Event | null;
}

// DELETE EVENT
export interface DeleteEventParams {
  uid: string;
}

export type DeleteEventResponseApi = ApiValidationError;

export interface DeleteEventResponse {
  success: boolean;
  message: string;
}

// EVENT API URLS
export enum EventUrl {
  CREATE = "/api/v2/events",
  GET_BY_SLUG = "/api/v2/events/",
  GET = "/api/v2/events",
  UPDATE = "/api/v2/events",
  DELETE = "/api/v2/events",
}

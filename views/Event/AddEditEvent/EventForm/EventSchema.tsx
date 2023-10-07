import { z } from "zod";

const ContactInfoSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  institution: z.string(),
  designation: z.string(),
});

const TicketInfoSchema = z.object({
  price: z.number(),
  availability: z.number(),
  sale_start_date: z.number(),
  sale_end_date: z.number(),
});

const ImageSchema = z.object({
  url: z.string().url(),
  alt: z.string(),
});

const LocationSchema = z.object({
  address: z.string(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

const EventSchema = z.object({
  uid: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  start_date: z.number(),
  end_date: z.number(),
  categories: z.array(z.string()),
  time: z.string(),
  contact: ContactInfoSchema,
  target_audience: z.array(z.string()),
  participant_count: z.number(),
  preregistration_required: z.boolean(),
  organizer: z.string(),
  resources_invested: z.string(),
  budgeted: z.boolean(),
  funding: z.string(),
  primary_image: ImageSchema,
  images: z.array(ImageSchema),
  location: LocationSchema,
  ticket_info: TicketInfoSchema,
  tags: z.array(z.string()),
});

type EventSchemaType = z.infer<typeof EventSchema>;

export {
  ContactInfoSchema,
  EventSchema,
  ImageSchema,
  LocationSchema,
  TicketInfoSchema,
};
export type { EventSchemaType };

import { Language } from "./services";

export interface NotificationType {
  message: string | null;
  type?: "error" | "warning" | "success";
  seconds?: number;
}

export interface LanguageOption {
  name: string;
  language: Language;
}

export enum FilterKey {
  USER_TYPE = "user",
  ROLE = "role",
  MANUFACTURER = "manufacturer",
  DISTRIBUTOR = "distributor",
  INACTIVE_USERS = "inactive-users",
  PAGE = "page",
  LIMIT = "limit",
  SEARCH = "search",
}

export interface SelectOptionType {
  name: string;
  value: string;
}

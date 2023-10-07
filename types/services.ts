export type Language = "en" | "de" | "fr" | "it" | "es";
export type Platform = "sally" | "insights";
export type UserType = "daaily" | "client" | null;

export interface Unauthorized {
  title: string;
  description: string;
}

export interface UserTypeOption {
  name: string;
  user: UserType;
}

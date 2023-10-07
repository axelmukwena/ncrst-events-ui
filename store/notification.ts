import { atom } from "recoil";

import { NotificationType } from "@/types/utilities";

export const notificationState = atom({
  key: "notification",
  default: { message: null } as NotificationType,
});

import { atom } from "recoil";

import { User } from "@/backend/service/user/types";

export const usersState = atom({
  key: "usersState",
  default: [] as User[],
});

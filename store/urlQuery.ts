import { atom } from "recoil";

import { Role } from "@/backend/service/utility/types";
import { UserType } from "@/types/services";

export const userTypeFilterState = atom({
  key: "userTypeFilter",
  default: null as UserType,
});

export const rolesFilterState = atom({
  key: "rolesFilter",
  default: [] as Role[],
});

export const manufacturersFilterState = atom({
  key: "manufacturersFilter",
  default: [] as string[],
});

export const distributorsFilterState = atom({
  key: "distributorsFilter",
  default: [] as string[],
});

export const showInactiveUsersFilterState = atom({
  key: "showInactiveUsersFilter",
  default: false,
});

export const searchFilterState = atom({
  key: "searchFilter",
  default: "",
});

import {
  testRoleNames,
  testRoleToPermissionMapping,
} from "@/tests/testConstants/utility";

import { Role, RoleToPermission } from "../service/utility/types";

export const getTestRoleNames = (): Promise<Role[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(testRoleNames), 1000);
  });

export const getTestRoleToPermissionMapping = (): Promise<RoleToPermission> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(testRoleToPermissionMapping), 1000);
  });

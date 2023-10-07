import { Permission } from "../user/types";

export type RoleToPermission = Record<string, Permission[]>;
export type Role = string;

export enum Environment {
  STAGING = 0,
  PRODUCTION = 1,
}

export enum PermissionActor {
  ADMIN = 0,
  EDITOR = 1,
  VIEWER = 2,
  NONE = 3,
}

export enum PermissionScopeName {
  USER = 0,
  MANUFACTURER = 1,
  PRODUCT = 2,
  FAMILY = 3,
  COLLECTION = 4,
  DESIGNER = 5,
  DISTRIBUTOR = 6,
  GROUP = 7,
  FILTER = 8,
  PROJECT = 9,
  FAIR = 10,
  CONTENT = 11,
  PERFORMANCE = 12,
  TREND = 13,
  INDEX = 14,
  LEADS = 15,
  VSR = 16,
  MEMBERSHIP = 17,
  STORY = 18,
}

export enum PermissionMember {
  SCOPE_NAME = 0,
  RESOURCE = 1,
  ACTOR = 2,
  ENVIRONMENT = 3,
}

export enum UtilityUrl {
  SCOPE_NAMES = "/api/v2/utilities/permission-scope-names",
  PERMISSION_ACTORS = "/api/v2/utilities/permission-actors",
  ROLE_NAMES = "/api/v2/utilities/role-names",
  PERMISSION_ENVS = "/api/v2/utilities/permission-environments",
  ROLE_TO_PERM_MAP = "/api/v2/utilities/role-to-permission-mapping",
}

export interface GetAnyResponse {
  success: boolean;
  message: string;
  data: any | null;
}

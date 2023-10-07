import { PermissionScopeName, Role } from "@/backend/service/utility/types";
import {
  ResourceUrl,
  ResourceUrlType,
} from "@/backend/services/lucy/resources/types";

interface ResolveResourceUrlParams {
  resourceType: PermissionScopeName;
  resourceUrlType: ResourceUrlType;
}

export const resolveResourceUrl = ({
  resourceType,
  resourceUrlType,
}: ResolveResourceUrlParams): string => {
  switch (resourceType) {
    case PermissionScopeName.MANUFACTURER:
      if (resourceUrlType === ResourceUrlType.ID) {
        return ResourceUrl.MANUFACTURER_BY_ID;
      }
      if (resourceUrlType === ResourceUrlType.SEARCH_NAME) {
        return ResourceUrl.MANUFACTURER_SEARCH_BY_NAME;
      }
      return ResourceUrl.MANUFACTURER_BY_IDS;
    case PermissionScopeName.DISTRIBUTOR:
      if (resourceUrlType === ResourceUrlType.ID) {
        return ResourceUrl.DISTRIBUTOR_BY_ID;
      }
      if (resourceUrlType === ResourceUrlType.SEARCH_NAME) {
        return ResourceUrl.DISTRIBUTOR_SEARCH_BY_NAME;
      }
      return ResourceUrl.DISTRIBUTOR_BY_IDS;
    case PermissionScopeName.DESIGNER:
      if (resourceUrlType === ResourceUrlType.ID) {
        return ResourceUrl.DESIGNER_BY_ID;
      }
      if (resourceUrlType === ResourceUrlType.SEARCH_NAME) {
        return ResourceUrl.DESIGNER_SEARCH_BY_NAME;
      }
      return ResourceUrl.DESIGNER_BY_IDS;
    default:
      throw new Error("Invalid resource type");
  }
};

export const SEARCHABLE_RESOURCES: PermissionScopeName[] = [
  PermissionScopeName.MANUFACTURER,
  PermissionScopeName.DISTRIBUTOR,
  PermissionScopeName.DESIGNER,
];

interface ResolveScopeNameForRoleResponse {
  type: PermissionScopeName | null;
  name: string | null;
}

/**
 * Resolve the scope name for the role
 * @param {Role} role The role
 * @returns {ResolveScopeNameForRoleResponse} The scope name
 */
export const resolveScopeNameForRole = (
  role: Role
): ResolveScopeNameForRoleResponse => {
  const defaultResolve = {
    type: null,
    name: null,
  };
  if (!role) {
    return defaultResolve;
  }

  if (role.toLowerCase().includes("manufacturer")) {
    return {
      type: PermissionScopeName.MANUFACTURER,
      name: "manufacturer",
    };
  }
  if (role.toLowerCase().includes("distributor")) {
    return {
      type: PermissionScopeName.DISTRIBUTOR,
      name: "distributor",
    };
  }
  if (role.toLowerCase().includes("designer")) {
    return {
      type: PermissionScopeName.DESIGNER,
      name: "designer",
    };
  }

  return defaultResolve;
};

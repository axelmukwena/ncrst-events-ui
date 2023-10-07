import { Permission, User } from "@/backend/service/user/types";
import {
  PermissionActor,
  PermissionScopeName,
} from "@/backend/service/utility/types";

import { enumToObject, getUniqueStrings, swapKeyValues } from "./objects";
import { toTitleCase } from "./text";

/**
 * Get the unique resource ids from permissions.
 * @param permissions The permissions.
 * @returns The unique manufacturer ids.
 */
export const getResourcesFromPermissions = (
  permissions: Permission[]
): string[] => {
  if (!permissions) return [];

  const resources: string[] = [];
  permissions.forEach((p) => {
    if (p.scope.resources) {
      resources.push(...p.scope.resources.filter(Number));
    }
  });
  return getUniqueStrings(resources);
};

interface ParsedPermission {
  actor: string;
  scope: {
    name: string;
    resources: string[] | null;
  };
}

export type ActorScopes = {
  actor: string;
  scopes: string[];
};

/**
 * Get the scopes from permissions.
 * @param {GetScopesFromPermissions} params The parameters.
 * @returns {ActorScopes[]} The scopes.
 */
export const getScopesFromPermissions = (
  permissions: Permission[]
): ActorScopes[] => {
  if (!permissions?.length) return [];

  // Group raw permissions by actor
  const groupedPermissions: Record<string, Permission[]> = permissions.reduce(
    (acc, item) => {
      const group = acc[item.actor] || [];
      group.push(item);
      acc[item.actor] = group;
      return acc;
    },
    {} as Record<string, Permission[]>
  );

  // Swap key-value pairs for easier lookup
  const permissionActors = enumToObject(PermissionActor);
  const actors = swapKeyValues(permissionActors);

  const scopeNames = enumToObject(PermissionScopeName);
  const scopes = swapKeyValues(scopeNames);

  // Transform the grouped permissions
  const groupedPermissionsParsed: Record<string, ParsedPermission[]> = {};
  Object.keys(groupedPermissions).forEach((actor) => {
    groupedPermissionsParsed[actor] = groupedPermissions[actor].map((item) => ({
      actor: toTitleCase(actors[item.actor]),
      scope: {
        name: toTitleCase(scopes[item.scope.name]),
        resources: item.scope.resources,
      },
    }));
  });

  const result: ActorScopes[] = [];
  for (const [actor, perms] of Object.entries(groupedPermissionsParsed)) {
    const parsedPermission: ActorScopes = {
      actor: toTitleCase(actors[Number(actor)]),
      scopes: perms.map((perm) => perm.scope.name),
    };
    result.push(parsedPermission);
  }

  return result;
};

interface GetUserActorOptions {
  currentUser: User | null;
  scopeName: PermissionScopeName;
}

/**
 * Get the actor options for the current user.
 * @param {GetUserActorOptions} params The parameters.
 * @returns {Record<string, string | number>} The actor options.
 */
export const getUserActorOptions = ({
  currentUser,
  scopeName,
}: GetUserActorOptions): { [key: string]: string | number } => {
  if (!currentUser?.permissions.length) {
    return {};
  }

  // Find the permission related to the current scope
  const actor = currentUser.permissions.find((p) => p.scope.name === scopeName)
    ?.actor;
  if (actor === undefined) {
    return {};
  }

  // Filter actor options that are higher permissions (lower number) than the current actor
  const allActorOptions = enumToObject(PermissionActor);
  const filteredActorOptionsRaw = Object.keys(allActorOptions).filter(
    (key) =>
      Number(PermissionActor[key as keyof typeof PermissionActor]) >= actor
  );

  const filteredActorOptions = filteredActorOptionsRaw.reduce(
    (acc, key) => {
      acc[key] = allActorOptions[key];
      return acc;
    },
    {} as { [key: string]: string | number }
  );

  return filteredActorOptions;
};

interface GetActorAdjustedPermissionsForCurrentUser {
  currentUser: User | null;
  rolePermissions: Permission[];
}

/**
 * Get the actor adjusted permissions for the current user.
 * @param {GetActorAdjustedPermissionsForCurrentUser} params The parameters.
 * @returns {Permission[]} The actor adjusted permissions.
 */
export const getActorAdjustedPermissionsForCurrentUser = ({
  currentUser,
  rolePermissions,
}: GetActorAdjustedPermissionsForCurrentUser): Permission[] => {
  if (!currentUser?.permissions.length) {
    return [];
  }

  const newPermissions: Permission[] = [];
  for (const rolePermission of rolePermissions) {
    const currentUserPermission = currentUser.permissions.find(
      (p) => p.scope.name === rolePermission.scope.name
    );
    if (currentUserPermission) {
      if (rolePermission.actor >= currentUserPermission.actor) {
        newPermissions.push(rolePermission);
      } else {
        newPermissions.push(currentUserPermission);
      }
    } else {
      newPermissions.push({ ...rolePermission, actor: PermissionActor.NONE });
    }
  }

  return newPermissions;
};

import { User } from "@/backend/service/user/types";

/**
 * Get the manufacturer ids from a user
 * @param {User} user - the user
 * @returns {string[]} - the manufacturer ids
 */
export const getManufacturerIds = (user: User): string[] => {
  const manufacturerIds: string[] = [];
  user.permissions.forEach((permission) => {
    const { resources } = permission.scope;
    if (resources) {
      manufacturerIds.push(...resources);
    }
  });
  return manufacturerIds;
};

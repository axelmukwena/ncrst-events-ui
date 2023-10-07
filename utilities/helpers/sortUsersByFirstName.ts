import { User } from "@/backend/service/user/types";

/**
 * Sorts users by first name.
 * @param users The users to sort.
 * @returns The sorted users.
 */
export const sortUsersByFirstName = (users: User[]): User[] =>
  users.sort((a, b) => {
    const nameA = a.first_name.toUpperCase();
    const nameB = b.first_name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

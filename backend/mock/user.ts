import {
  testUserExternal,
  testUserInternalExpert,
  testUserInternalOwner,
  testUsers,
} from "../../tests/testConstants/events";
import { GetUsersResponse, User } from "../service/user/types";

export const getTestUserInternalOwner = (): Promise<User> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(testUserInternalOwner);
    }, 1000);
  });

export const getTestUserInternalExpert = (): Promise<User> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(testUserInternalExpert);
    }, 1000);
  });

export const getTestUserExternal = (): Promise<User> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(testUserExternal);
    }, 1000);
  });

export const getTestUserByUid = (uid: string): Promise<User | null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(testUsers.find((user) => user.uid === uid) || null);
    }, 1000);
  });

export const getTestUsers = (): Promise<GetUsersResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        users: testUsers,
        total: 282,
        success: true,
        message: "",
      });
    }, 1000);
  });

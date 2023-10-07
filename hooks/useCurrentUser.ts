/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthState } from "react-firebase-hooks/auth";
import useSWR from "swr";

import { UserService } from "@/backend/service/user/user.service";
import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";

// import { initAuth } from "../backend/service/firebase";
import { UseCurrentUser, User, UserUrl } from "../backend/service/user/types";

/**
 * A hook to get the current user.
 * @returns The current user.
 */
const useCurrentUser = (): UseCurrentUser =>
  // const auth = initAuth();
  // const [user, loading, error] = useAuthState(auth);

  // const fetcher = async (): Promise<User | null> => {
  //   if (!user) {
  //     return null;
  //   }
  //   const token = await user.getIdToken();
  //   const userService = new UserService(token);
  //   const res = await userService.getByUid(user.uid);
  //   if (res.success) {
  //     return res.user;
  //   }
  //   throw new Error(res.message);
  // };

  // const {
  //   data: currentUser,
  //   error: currentUserError,
  //   isLoading,
  // } = useSWR(`${UserUrl.GET_BY_UID}${user?.uid}`, fetcher, {
  //   refreshInterval: 10000,
  // });

  // const currentUserLoading =
  //   loading || !!(user && !currentUser && !currentUserError) || isLoading;

  ({
    currentUser: null,
    currentUserLoading: false,
    currentUserError: "",
    firebaseUser: null,
    firebaseUserLoading: false,
  });
export default useCurrentUser;

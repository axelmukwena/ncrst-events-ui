import { useEffect, useState } from "react";

/**
 * Custom hook with a higher order function to get the id token from the
 * firebase user and pass it to the callback function.
 *
 * @returns The callback function with the current user's id token.
 */
const useWithIdToken = (): (<R>(
  asyncCallback: (token: string) => Promise<R>
) => Promise<R>) => {
  const [idToken, setIdToken] = useState<string>("");
  // const auth = initAuth();
  // const [user] = useAuthState(auth);
  const user = null;

  const handleGetIdToken = async (): Promise<void> => {
    // const newToken = await user?.getIdToken();
    setIdToken("");
  };

  useEffect(() => {
    if (user) {
      handleGetIdToken();
    }
  }, [user]);

  const withUserToken = async <R>(
    asyncCallback: (token: string) => Promise<R>
  ): Promise<R> => asyncCallback(idToken);

  return withUserToken;
};

export default useWithIdToken;

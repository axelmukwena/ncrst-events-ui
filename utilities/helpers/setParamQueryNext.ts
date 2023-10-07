import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface SetParamQueryProps {
  newValue: string | null;
  removeValue: string | null;
  queryKey: string;
  pathname: string;
  searchParams: URLSearchParams;
  router: AppRouterInstance;
}

/**
 * Sets the search query for a given query key.
 * @param {SetParamQueryProps} props - The props.
 * @returns {void}
 */
export const setParamQueryNext = ({
  newValue,
  removeValue,
  queryKey,
  pathname,
  searchParams: readonlySearchParams,
  router,
}: SetParamQueryProps): void => {
  const searchParams = new URLSearchParams(readonlySearchParams);
  const currentValues = [...new Set(searchParams.getAll(queryKey))];

  if (newValue && !currentValues.includes(newValue)) {
    currentValues.push(newValue);
  }

  if (removeValue) {
    currentValues.splice(currentValues.indexOf(removeValue), 1);
  }

  // Remove the query key from the search params
  searchParams.delete(queryKey);

  // Add the query key back to the search params with the new values
  currentValues.forEach((value) => {
    searchParams.append(queryKey, value);
  });

  // Generate the new query string
  const newSearch = searchParams.toString();

  // TODO: Next 13 does not support shallow routing
  // https://github.com/vercel/next.js/discussions/48110
  router.push(`${pathname}?${newSearch}`);
};

import { FilterKey } from "@/types/utilities";

interface SetParamQueryProps {
  newValue: string | null;
  removeValue?: string | null;
  overWrite?: boolean;
  queryKey: FilterKey;
}

interface GetParamQueryReturn {
  values: string[];
  searchParams: URLSearchParams;
  url: URL;
  clientSide: boolean;
}

/**
 * Get the search query for a given query key with the window object.
 * @param {FilterKey} queryKey - The query key.
 * @returns {string[]} - The search query values.
 */
export const getParamQueryWindow = (
  queryKey: FilterKey
): GetParamQueryReturn => {
  if (typeof window === "undefined") {
    return {
      values: [],
      searchParams: new URLSearchParams(),
      url: new URL(""),
      clientSide: false,
    };
  }

  // Parse current URL and query parameters
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const values = [...new Set(searchParams.getAll(queryKey))];
  return { values, searchParams, url, clientSide: true };
};

/**
 * Sets the search query for a given query key with the window object.
 * @param {SetParamQueryProps} props - The props.
 * @returns {void}
 */
export const setParamQueryWindow = ({
  newValue,
  removeValue,
  overWrite = false,
  queryKey,
}: SetParamQueryProps): void => {
  const { values, searchParams, url, clientSide } =
    getParamQueryWindow(queryKey);

  if (!clientSide) {
    return;
  }

  if (overWrite) {
    values.length = 0;
  }

  // Add new value if it doesn't already exist
  if (newValue && !values.includes(newValue)) {
    values.push(newValue);
  }

  // Remove value if it exists
  if (removeValue) {
    const index = values.indexOf(removeValue);
    if (index > -1) {
      values.splice(index, 1);
    }
  }

  // Remove the query key from the search params
  searchParams.delete(queryKey);

  // Add the query key back to the search params with the new values
  values.forEach((value) => {
    searchParams.append(queryKey, value);
  });

  // Update the URL's search parameters
  url.search = searchParams.toString();

  // Update the browser's URL and history
  window.history.replaceState({}, "", url.toString());
};

/**
 * Clears the search query for a given query keys with the window object.
 * @param {FilterKey[]} queryKeys - The query keys.
 * @returns {void}
 */
export const clearParamQueryWindow = (queryKeys: FilterKey[]): void => {
  const { searchParams, url, clientSide } = getParamQueryWindow(queryKeys[0]);

  if (!clientSide) {
    return;
  }

  queryKeys.forEach((key) => {
    searchParams.delete(key);
  });

  url.search = searchParams.toString();
  window.history.replaceState({}, "", url.toString());
};

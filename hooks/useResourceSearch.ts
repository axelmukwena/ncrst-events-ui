// import useSWR from "swr";

// import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";
// import { resolveResourceUrl } from "@/utilities/helpers/resolveResources";
// import { isNumber } from "@/utilities/helpers/validations";

// import useCurrentUser from "./useCurrentUser";

// /**
//  * Hook to search resources by name
//  * @param {GetSearchResourceByName} params The params to search the resources
//  * @returns {UseResources} The resources
//  */
// export const useResourceSearch = ({
//   name,
//   type,
// }: GetSearchResourceByName): UseResources => {
//   const { firebaseUser } = useCurrentUser();

//   const fetcher = async (): Promise<Resource[] | null> => {
//     if (!name) {
//       return [];
//     }

//     if (!firebaseUser) {
//       return null;
//     }
//     const token = await firebaseUser.getIdToken();
//     const resourceService = new ResourceService(token);

//     // if input is a number, search by id. if id is not found, search by name
//     if (isNumber(name)) {
//       const res = await resourceService.getById({ id: name, type });
//       if (res.success && res.resource) {
//         return [res.resource];
//       }
//       if (!res.success) {
//         throw new Error(res.message);
//       }
//     }
//     const res = await resourceService.searchByName({ name, type });
//     if (res.success) {
//       return res.resources || null;
//     }
//     throw new Error(res.message);
//   };

//   const urlStem = resolveResourceUrl({
//     resourceType: type,
//     resourceUrlType: ResourceUrlType.SEARCH_NAME,
//   });
//   const { data, error, isLoading } = useSWR(`${urlStem}${name}`, fetcher);

//   return {
//     resources: data || [],
//     loading: !!(name && !data && !error) || isLoading,
//     error: getErrorMessage(error),
//   };
// };

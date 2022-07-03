import { useQuery } from "react-query";
import { API_BASE, USERS_ENDPOINT } from "../constants";
import { authorizedFetch } from "./client";

const fetchUser = async (userName: string | undefined): Promise<UserDetail> => {
  return authorizedFetch(API_BASE + USERS_ENDPOINT + `/${userName}`)
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => error);
};

export const useUserQuery = (userName: string | undefined) => {
  return useQuery(["user", userName], () => fetchUser(userName), {
    enabled: !!userName,
  });
};

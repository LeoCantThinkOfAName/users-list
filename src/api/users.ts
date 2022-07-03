import { useInfiniteQuery } from "react-query";
import { API_BASE, ITEMS_PER_PAGE, USERS_ENDPOINT } from "../constants";
import { authorizedFetch } from "./client";
import { parse } from "query-string";

interface UsersResponse {
  nextSince?: number;
  users: User[];
}

type LinkKey = "next" | "prev" | "last" | "first" | "";

type LinkHeader = {
  [key in LinkKey]: string;
};

const fetchUsers = async ({ pageParam = 0 }): Promise<UsersResponse> => {
  const perPageParam = `?per_page=${ITEMS_PER_PAGE}`;
  return authorizedFetch(
    API_BASE + USERS_ENDPOINT + perPageParam + `&since=${pageParam}`,
  )
    .then(async (res) => {
      const linkHeader = res.headers.get("link") || null;
      const parsed = linkHeader ? parseLinkHeader(linkHeader) : null;
      const nextURL = parsed?.next ? new URL(parsed.next) : null;
      const search = nextURL ? parse(nextURL.search) : null;
      const nextPageSince = search ? (search.since as unknown as string) : null;
      return res.json().then((data: User[]) => ({
        users: data,
        ...(nextPageSince ? { nextSince: parseInt(nextPageSince, 10) } : {}),
      }));
    })
    .catch((error) => error);
};

const parseLinkHeader = (linkHeader: string) => {
  return linkHeader.split(",").reduce((acc, link) => {
    let match = link.match(/<(.*)>; rel="(\w*)"/);
    let url = match ? match[1] : "";
    let rel: LinkKey = match ? (match[2] as LinkKey) : "";
    acc[rel] = url;
    return acc;
  }, {} as LinkHeader);
};

export const useUsersQuery = () => {
  return useInfiniteQuery("users", fetchUsers, {
    getNextPageParam: (lastPage) => lastPage.nextSince ?? undefined,
  });
};

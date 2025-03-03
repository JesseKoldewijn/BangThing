import type { bangs as bangsSource } from "../bang/source";
import { fetchBangs } from "./fetch";

export const getBangs = async () => {
  try {
    const isDev = import.meta.env.DEV;

    if (isDev) {
      console.debug("bangs cache disabled");
      const importedBangs = await import("./source").then((x) => x.bangs);
      if (typeof window !== "undefined") {
        localStorage.setItem("bangs", JSON.stringify(importedBangs));
      }
      return importedBangs;
    }

    const localCache = localStorage.getItem("bangs");
    if (localCache) {
      console.debug("bangs cache found");

      return JSON.parse(localCache) as typeof bangsSource;
    }

    const fetchedBangs = await fetchBangs();

    if (fetchedBangs) {
      console.debug("bangs fetched");
      localStorage.setItem("bangs", JSON.stringify(fetchedBangs));
      return fetchedBangs;
    }
    return [];
  } catch (err) {
    return [];
  }
};

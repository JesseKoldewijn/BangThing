import { fetchBangs } from "./fetch";
import type { bangs as bangsSource } from "./source";

export const getBangs = async () => {
  try {
    const isDev = process.env.NODE_ENV === "development";

    const localCacheExpiry = localStorage.getItem("bangsExpiry");
    const now = new Date().getTime();
    const cacheExpiryTime = 1000 * 60 * 60 * 24; // 24 hours
    const isCacheExpired = localCacheExpiry
      ? now - parseInt(localCacheExpiry) > cacheExpiryTime
      : true;

    if (isDev && typeof window !== "undefined") {
      const importedBangs = await import("./source").then((x) => x.bangs);
      if (typeof window !== "undefined") {
        localStorage.setItem("bangs", JSON.stringify(importedBangs));
        localStorage.setItem("bangsExpiry", now.toString());
      }
      return importedBangs;
    }

    const localCache = localStorage.getItem("bangs");

    if (localCache && !isCacheExpired) {
      return JSON.parse(localCache) as typeof bangsSource;
    }

    const fetchedBangs = await fetchBangs();

    if (fetchedBangs) {
      localStorage.setItem("bangs", JSON.stringify(fetchedBangs));
      localStorage.setItem("bangsExpiry", now.toString());
      return fetchedBangs;
    }
    return [];
  } catch (err) {
    console.error("Error fetching bangs:", err);
    return [];
  }
};

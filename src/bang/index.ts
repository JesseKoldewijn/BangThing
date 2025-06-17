import { fetchBangs } from "./fetch";
import type { bangs as bangsSource } from "./source";

export const getBangs = async () => {
  const getLocalCache = () => {
    if (typeof window === "undefined") {
      return {
        cachedBangs: null,
        isCacheExpired: true,
        now: new Date().getTime(),
      };
    }

    const localCache = localStorage.getItem("bangs") ?? null;
    const localCacheExpiry = localStorage.getItem("bangsExpiry");

    const now = new Date().getTime();
    const cacheExpiryTime = 1000 * 60 * 60 * 24; // 24 hours
    const isCacheExpired = localCacheExpiry
      ? now - parseInt(localCacheExpiry) > cacheExpiryTime
      : true;

    if (localCache && !isCacheExpired) {
      return {
        cachedBangs: JSON.parse(localCache) as typeof bangsSource,
        isCacheExpired,
        now,
      };
    }

    return {
      bangs: null,
      isCacheExpired,
      now,
    };
  };

  try {
    const isDev = process.env.NODE_ENV === "development";

    const { cachedBangs, isCacheExpired, now } = getLocalCache();

    if (isDev && typeof window !== "undefined") {
      const importedBangs = await import("./source").then((x) => x.bangs);
      if (typeof window !== "undefined") {
        localStorage.setItem("bangs", JSON.stringify(importedBangs));
        localStorage.setItem("bangsExpiry", now.toString());
      }
      return importedBangs;
    }

    if (typeof window !== "undefined" && !isCacheExpired) {
      return cachedBangs;
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
    return [] as typeof bangsSource;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const { cachedBangs, isCacheExpired, now } = getLocalCache();

    console.error("Error fetching bangs:", {
      message,
      cachedBangsLength:
        cachedBangs && cachedBangs.length > 0 ? cachedBangs.length : 0,
      isCacheExpired,
      now,
    });

    return [] as typeof bangsSource;
  }
};

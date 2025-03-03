import { fetchBangs } from "./fetch";
import type { bangs as bangsSource } from "../bang/source";

export const getBangs = async () => {
	const isDev = import.meta.env.DEV;

	if (isDev) await import("./source").then((x) => x.bangs);

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
};

import type { CookieName } from "../constants/cookies";

export const getCookies = () => {
	const cookieString = document.cookie;
	const cookies = cookieString.split(";");
	const cookieMap = new Map<CookieName, string>();
	for (const cookie of cookies) {
		const [key, value] = cookie.split("=");
		if (!key || !value) continue;
		cookieMap.set(key.trim() as CookieName, value.trim());
	}
	return cookieMap;
};

export const getCookie = (name: CookieName) => {
	const cookieMap = getCookies();
	return cookieMap.get(name);
};

export const setCookie = (name: CookieName, value: string) => {
	document.cookie = `${name}=${value}; path=/`;
};

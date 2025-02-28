export const COOKIES = {
	DEFAULT_BANG: "default-bang",
	BANGS_CACHE: "bangs-cache",
	CUSTOM_BANGS: "custom-bangs",
} as const;
export type CookieName = (typeof COOKIES)[keyof typeof COOKIES];
export type CookieNames = CookieName[];

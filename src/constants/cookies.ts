export const COOKIES = {
	DEFAULT_BANG: "default-bang",
	CUSTOM_BANGS: "custom-bangs",
} as const;
export type CookieName = (typeof COOKIES)[keyof typeof COOKIES];
export type CookieNames = CookieName[];

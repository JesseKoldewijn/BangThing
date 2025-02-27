export const COOKIES = {
	DEFAULT_BANG: "default-bang",
} as const;
export type CookieName = (typeof COOKIES)[keyof typeof COOKIES];
export type CookieNames = CookieName[];

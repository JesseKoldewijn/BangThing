import { appBangs } from "./app";
import { baseBangs } from "./base";
import type { BangsArray } from "./types";

// @ts-expect-error
export const bangs = [...appBangs, ...baseBangs] as BangsArray;

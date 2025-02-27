import { bangs } from "../bang";
import { getCookie } from "../utils/cookies";

export const LS_DEFAULT_BANG = getCookie("default-bang") ?? "g";
export const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG);

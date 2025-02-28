import { getBangs } from "../bang";
import type { bangs } from "../bang/source";
import { getElementByElemID } from "../utils/element";

export const BANGS_PAYLOAD = () => {
	const json = getElementByElemID("bangs-payload");
	if (!json) return [];
	return JSON.parse(json.textContent ?? "[]") as typeof bangs;
};

export const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "g";
export const defaultBang = async () =>
	(await getBangs()).find((b) => b.t === LS_DEFAULT_BANG);

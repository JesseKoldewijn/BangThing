import { BANGS_PAYLOAD } from "../constants/defaults";
import { getCookie, setCookie } from "../utils/cookies";

const jsonCanParse = (jsonString: string) => {
	try {
		JSON.parse(jsonString);
		return true;
	} catch (e) {
		return false;
	}
};

export const getBangs = async () => {
	const bangsCookie = getCookie("bangs-cache");

	let bangs: ReturnType<typeof BANGS_PAYLOAD> =
		bangsCookie && jsonCanParse(bangsCookie)
			? JSON.parse(bangsCookie)
			: null;

	if (!bangs) {
		bangs = await import("./source").then((x) => x.bangs);
		setCookie("bangs-cache", JSON.stringify(bangs));
		return bangs;
	}
	return bangs;
};

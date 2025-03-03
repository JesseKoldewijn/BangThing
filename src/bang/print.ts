import { BANGS_PUBLIC_PATH } from "../constants/defaults";

const isServer = () => typeof window === "undefined";

export const printBangs = async () => {
	try {
		const isServerEnv = isServer();
		if (!isServerEnv) return;
		const writeFileSync = await import("fs").then((x) => x.writeFileSync);
		const bangs = await import("./source").then((x) => x.bangs);

		const bangsJson = JSON.stringify(bangs, null, 2);

		const publicDirectory = `${
			import.meta.dirname
		}${BANGS_PUBLIC_PATH}`.replace("src/bang/", "dist/");

		writeFileSync(publicDirectory, bangsJson);

		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
};

import type { PluginOption } from "vite";
import { printBangs } from "./print";

export const printBangsPlugin = () => {
	const config: PluginOption = {
		name: "print-bangs",
		closeBundle: async () => {
			await printBangs();
		},
	};

	return config;
};

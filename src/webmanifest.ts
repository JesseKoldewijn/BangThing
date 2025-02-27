import type { ManifestOptions } from "vite-plugin-pwa";

export const webmanifest: Partial<ManifestOptions> = {
	name: "BangThing",
	short_name: "BangThing",
	lang: "en-US",
	theme_color: "#000000",
	background_color: "#000000",
	icons: [
		{
			purpose: "maskable",
			sizes: "512x512",
			src: "search-512_maskable.png",
			type: "image/png",
		},
		{
			purpose: "any",
			sizes: "512x512",
			src: "search-512_rounded.png",
			type: "image/png",
		},
	],
	start_url: "/",
	orientation: "any",
	display: "standalone",
};

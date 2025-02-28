export const getBangs = async () => {
	return await import("./source").then((x) => x.bangs);
};

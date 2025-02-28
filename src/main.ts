import { getBangRedirectUrl } from "./logic/getRedirect";

const doRedirect = async () => {
	const searchUrl = await getBangRedirectUrl();
	if (!searchUrl) return;
	window.location.replace(searchUrl);
};

doRedirect();

import { getBangRedirectUrl } from "./logic/getRedirect";

function doRedirect() {
	const searchUrl = getBangRedirectUrl();
	if (!searchUrl) return;
	window.location.replace(searchUrl);
}

doRedirect();

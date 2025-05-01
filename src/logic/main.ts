import { getBangRedirectUrl } from "./getRedirect";

const doRedirect = async () => {
  const searchUrl = await getBangRedirectUrl();
  if (!searchUrl) return;
  // Add localStorage item to indicate prior redirect
  localStorage.setItem("bangRedirected", "true");
  // Redirect to the search URL
  window.location.replace(searchUrl);
};

doRedirect();

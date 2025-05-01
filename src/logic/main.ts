import { useEffect } from "react";

import { getBangRedirectUrl } from "./getRedirect";

export const MainScript = () => {
  const doRedirect = async () => {
    const searchUrl = await getBangRedirectUrl();
    if (!searchUrl) return;
    // Add localStorage item to indicate prior redirect
    localStorage.setItem("bangRedirected", "true");
    localStorage.setItem("bangLastRedirect", searchUrl);
    // Redirect to the search URL
    window.location.replace(searchUrl);
  };

  useEffect(() => {
    doRedirect();
  }, []);

  return null;
};

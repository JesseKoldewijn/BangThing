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

  const swRegistration = async () => {
    const sqUrl = new URL(window.location.href);
    sqUrl.pathname = "/sw.js";

    // register the service worker
    if ("serviceWorker" in navigator) {
      const isRegistered = localStorage.getItem("swRegistered");
      if (!isRegistered) {
        navigator.serviceWorker.register(sqUrl.href).then((registration) => {
          console.log(
            "Service Worker registered with scope: ",
            registration.scope,
          );
        });
        localStorage.setItem("swRegistered", "true");
        return;
      }
    }
  };

  useEffect(() => {
    swRegistration();
    doRedirect();
  }, []);

  return null;
};

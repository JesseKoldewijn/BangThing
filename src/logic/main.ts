import { useEffect } from "react";
import { pwaInfo } from "virtual:pwa-info";

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
    try {
      const sqUrl = new URL(window.location.href);
      sqUrl.pathname = pwaInfo?.registerSW?.registerPath ?? "/sw.js";

      navigator.serviceWorker.register(sqUrl.href).then((registration) => {
        console.log(
          "Service Worker registered with scope: ",
          registration.scope,
        );
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Error registering service worker", message);
      localStorage.setItem("swRegistered", "false");
    }
  };

  useEffect(() => {
    swRegistration();
    doRedirect();
  }, []);

  return null;
};

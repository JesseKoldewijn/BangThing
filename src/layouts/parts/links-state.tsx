import { useEffect } from "react";

export const LinkState = () => {
  const setActiveLink = () => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Get all the links in the navigation
    const navLinksContainer = document.getElementById("nav-links");
    const navLinks = navLinksContainer?.querySelectorAll("a") ?? [];

    // Loop through each link
    navLinks.forEach((link) => {
      // Check if the link's href matches the current URL
      if (link?.href === currentUrl) {
        // Add the active class to the link
        link.setAttribute("data-active", "true");
        link.ariaCurrent = "page";
      } else {
        // Remove the active class from the link
        link.removeAttribute("data-active");
        link.ariaCurrent = "false";
      }
    });
  };

  const enableConfigLink = () => {
    const configLink = document.getElementById("config-link");
    if (!configLink) return;

    const hasBeenRedirected = Boolean(localStorage.getItem("bangRedirected"));
    const hasShowConfigFlag =
      window.location.search.includes("showConfig=true");
    const isDev = process.env.NODE_ENV === "development";

    const showConfig = hasBeenRedirected || hasShowConfigFlag || isDev;

    if (showConfig) {
      configLink.removeAttribute("data-hidden");
      configLink.ariaDisabled = "false";
    } else {
      configLink.setAttribute("data-hidden", "true");
      configLink.ariaDisabled = "true";
    }
  };

  useEffect(() => {
    const runEvents = () => {
      setActiveLink();
      enableConfigLink();
    };

    runEvents();

    // Add event listeners to window url change
    window.addEventListener("popstate", runEvents);
    window.addEventListener("pushstate", runEvents);
    window.addEventListener("replacestate", runEvents);
    window.addEventListener("hashchange", runEvents);
    window.addEventListener("load", runEvents);
    window.addEventListener("DOMContentLoaded", runEvents);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("popstate", runEvents);
      window.removeEventListener("pushstate", runEvents);
      window.removeEventListener("replacestate", runEvents);
      window.removeEventListener("hashchange", runEvents);
      window.removeEventListener("load", runEvents);
      window.removeEventListener("DOMContentLoaded", runEvents);
    };
  }, []);

  return null;
};

const getUrlFromServerOrClient = () => {
  if (typeof window !== "undefined") {
    const base = window.location.href;
    const baseUrl = new URL(base);
    baseUrl.pathname = "";
    baseUrl.search = "";
    baseUrl.hash = "";

    return baseUrl.toString();
  } else {
    return "https://bang.jereko.dev";
  }
};

export const appBangs = [
  {
    c: "App",
    d: getUrlFromServerOrClient(),
    r: 0,
    s: "BangThing - Jereko",
    sc: "App",
    t: "bt:app",
    u: `${getUrlFromServerOrClient()}/`,
  },
  {
    c: "App",
    d: getUrlFromServerOrClient(),
    r: 0,
    s: "BangThing - Jereko",
    sc: "App",
    t: "bt:config",
    u: `${getUrlFromServerOrClient()}/config`,
  },
  {
    c: "App",
    d: getUrlFromServerOrClient(),
    r: 0,
    s: "BangThing - Jereko",
    sc: "App",
    t: "bt:docs",
    u: `${getUrlFromServerOrClient()}/docs`,
  },
] as const;

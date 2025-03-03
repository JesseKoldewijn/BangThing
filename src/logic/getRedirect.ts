import { getBangs } from "../bang";
import { defaultBang } from "../constants/defaults";
import { noSearchDefault } from "./noSearchDefault";

export const getBangRedirectUrl = async () => {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";

  if (!query) {
    await noSearchDefault();
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang =
    (await getBangs()).find((b) => b.t === bangCandidate) ??
    (await defaultBang());

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // Format of the url is:
  // https://www.search-engine.web/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+something/something-else"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/"),
  );

  return !searchUrl ? null : searchUrl;
};

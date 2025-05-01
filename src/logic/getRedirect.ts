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

  const bangRegex = /!(\S+)/i;
  const match = bangRegex.exec(query);

  const bangCandidate = match?.[1]?.toLowerCase();

  const bangsList = await getBangs();
  const selected = bangsList?.find(
    (b) => b.t === bangCandidate || b.t === `!${bangCandidate}`,
  );
  const defaultBangEntry = await defaultBang();
  const selectedBang = selected ?? defaultBangEntry;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // Format of the url is:
  // https://www.search-engine.web/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+something/something-else"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/"),
  );

  return searchUrl ?? null;
};

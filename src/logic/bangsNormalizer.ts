import type { BangsArray } from "~/bang/source/types";

export interface NormalizedBang {
  category: string; // category;
  domain: string; // domain;
  site: string; // site;
  siteCategory: string; // site category;
  command: string; // command;
  url: string; // url;
}

export const bangsNormalizer = (_bangs: BangsArray) => {
  const normalizedBangs = _bangs.map((bang) => {
    const { c, d, t, u } = bang;
    const category = c ?? "";
    const domain = d ?? "";
    const site = d ?? "";
    const siteCategory = c ?? "";
    const command = t ?? "";
    const url = u ?? "";

    return {
      category,
      domain,
      site,
      siteCategory,
      command,
      url,
    } as NormalizedBang;
  });

  return normalizedBangs;
};

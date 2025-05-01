import { BangsArray } from "~/bang/source/types";
import { bangsNormalizer } from "~/logic/bangsNormalizer";

export class BangItemEnhancement {
  static normalizer(bang: BangsArray[number]) {
    return bangsNormalizer([bang])[0];
  }

  static getQuery(query: string) {
    try {
      return {
        url: new URL(query),
        query,
      };
    } catch (e) {
      return { query };
    }
  }

  static getBangQuery(normalized: ReturnType<typeof bangsNormalizer>[number]) {
    const { url, query } = this.getQuery(normalized.url);
    return {
      url,
      query,
    };
  }
}

import { BangsArray } from "~/bang/source/types";

import { BangItemEnhancement } from "./bang-item-model";

export const createBangNormalizerSelector = (bang: BangsArray[number]) => {
  return BangItemEnhancement.normalizer(bang);
};

export const createBangQuerySelector = (bang: BangsArray[number]) => {
  const normalized = BangItemEnhancement.normalizer(bang);
  return BangItemEnhancement.getQuery(normalized.url);
};


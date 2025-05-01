import { RawBang } from "~/bang/source/types";
import {
  createBangNormalizerSelector,
  createBangQuerySelector,
} from "~/enhancements/config/bang-item/bang-item/bang-item-selectors";
import { connect } from "~/utils/enhancement-connector";

import { type BangItemProps, INTERNAL_BangItem } from "./bang-item";

interface BangItemEnhancedProps
  extends Omit<BangItemProps, "bang" | "query" | "url"> {
  bang: RawBang;
}

export const mapToProps = ({ bang: _bang, ...rest }: BangItemEnhancedProps) => {
  const bang = createBangNormalizerSelector(_bang);
  const bangQuery = createBangQuerySelector(_bang);

  return {
    bang,
    url: bangQuery.url,
    query: bangQuery.query,
    ...rest,
  } satisfies Partial<BangItemProps>;
};

const BangItemEnhanced = connect(mapToProps, INTERNAL_BangItem);

export const BangItem = BangItemEnhanced;

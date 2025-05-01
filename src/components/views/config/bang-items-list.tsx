import { BangsArray } from "~/bang/source/types";
import { Show } from "~/components/utils/show";

import { BangItem } from "./bang-item-enhanced";

interface BangsListProps {
  bangsList: BangsArray;
}

export const BangsList = ({ bangsList }: BangsListProps) => {
  return (
    <Show when={bangsList.length > 0} fallback={bangsListFallback}>
      <BangsLister bangsList={bangsList} />
    </Show>
  );
};

const bangsListFallback = (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold">No results found</h2>
      <p className="text-sm text-gray-500">Try searching for something else.</p>
    </div>
  </div>
);

const BangsLister = ({ bangsList }: BangsListProps) => {
  return (
    <div className="relative flex min-h-full w-full flex-col gap-2 scroll-smooth py-2">
      {bangsList.map((item) => {
        return <BangItem key={item.t} className="flex flex-col" bang={item} />;
      })}
    </div>
  );
};

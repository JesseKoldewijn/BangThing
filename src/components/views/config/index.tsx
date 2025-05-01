import { useRef, useState } from "react";

import type { bangs } from "~/bang/source";
import { bangsNormalizer } from "~/logic/bangsNormalizer";

import BangItem from "./bang-item";

const pageSize = 10;

export const ConfigView = ({ ssrBangs }: { ssrBangs: typeof bangs }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [bangsList, setBangsList] = useState<typeof bangs>(
    ssrBangs.slice(0, pageSize),
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(ssrBangs.length / pageSize),
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setBangsList(ssrBangs);
  };

  const updatePage = (page: number) => {
    setCurrentPage(page);
    setBangsList(ssrBangs.slice(page * pageSize, (page + 1) * pageSize));
    if (parentRef.current) {
      parentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      handleReset();
      return;
    }
    setIsLoading(true);
    const filteredBangs = ssrBangs.filter((bang) => {
      const normalized = bangsNormalizer([bang])[0];

      const matchesByKey = {
        category: normalized.category.toLowerCase().includes(searchTerm),
        domain: normalized.domain.toLowerCase().includes(searchTerm),
        site: normalized.site.toLowerCase().includes(searchTerm),
        siteCategory: normalized.siteCategory
          .toLowerCase()
          .includes(searchTerm),
        command: normalized.command.toLowerCase().includes(searchTerm),
        url: normalized.url.toLowerCase().includes(searchTerm),
      };

      return matchesByKey.command;
    });
    setBangsList(
      filteredBangs.slice(currentPage * pageSize, (currentPage + 1) * pageSize),
    );
    setTotalPages(Math.ceil(filteredBangs.length / pageSize));
    setCurrentPage(0);
    if (parentRef.current) {
      parentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-col items-center justify-start gap-2">
        <p>Here you can see the current bang configuration.</p>
      </div>

      <div className="flex w-full max-w-md items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Search for a bang..."
          className="w-full rounded border border-gray-300 p-2"
          onKeyUp={(e) =>
            handleSearch(e as any as React.ChangeEvent<HTMLInputElement>)
          }
          onChange={handleSearch}
        />
        <button
          className="rounded bg-neutral-500 px-4 py-2 text-white"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <div
        ref={parentRef}
        className="h-[600px] w-full max-w-md overflow-x-hidden overflow-y-auto"
      >
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-bold">Loading...</h2>
              <p className="text-sm text-gray-500">Please wait.</p>
            </div>
          </div>
        )}
        {bangsList.length === 0 && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-bold">No results found</h2>
              <p className="text-sm text-gray-500">
                Try searching for something else.
              </p>
            </div>
          </div>
        )}
        <div className="relative flex min-h-full w-full flex-col gap-2 scroll-smooth py-2">
          {bangsList.length > 0 &&
            bangsList.map((item) => {
              return (
                <BangItem key={item.t} className="flex flex-col" bang={item} />
              );
            })}
        </div>
      </div>

      <div className="flex w-full max-w-md items-center justify-between">
        <button
          className="cursor-pointer rounded bg-neutral-500 px-4 py-2 text-white"
          style={{
            opacity: currentPage === 0 ? 0.5 : 1,
          }}
          onClick={() => {
            if (currentPage > 0) {
              updatePage(currentPage - 1);
            }
          }}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="cursor-pointer rounded bg-neutral-500 px-4 py-2 text-white"
          style={{
            opacity: currentPage === totalPages - 1 ? 0.5 : 1,
          }}
          onClick={() => {
            if (currentPage < totalPages - 1) {
              updatePage(currentPage + 1);
            }
          }}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

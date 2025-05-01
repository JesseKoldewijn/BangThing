import { useRef, useState } from "react";

import { BangsArray } from "~/bang/source/types";
import { Show } from "~/components/utils/show";
import { bangsNormalizer } from "~/logic/bangsNormalizer";

import { BangsList } from "./bang-items-list";

const pageSize = 10;

export const ConfigView = ({ ssrBangs }: { ssrBangs: BangsArray }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultBangs = ssrBangs.slice(0, pageSize);
  const defaultTotalPages = Math.ceil(ssrBangs.length / pageSize);

  const [bangsList, setBangsList] = useState<BangsArray>(defaultBangs);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(defaultTotalPages);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setBangsList(defaultBangs);
    setTotalPages(defaultTotalPages);
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

  const handleSearch = (value: string) => {
    const searchTerm = value.toLowerCase();

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

      return matchesByKey.command || matchesByKey.site;
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
          ref={inputRef}
          type="text"
          placeholder="Search for a bang..."
          className="w-full rounded border border-gray-300 p-2"
          onChange={(e) => handleSearch(e.target.value)}
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
        <Show when={isLoading}>
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-bold">Loading...</h2>
              <p className="text-sm text-gray-500">Please wait.</p>
            </div>
          </div>
        </Show>

        <BangsList bangsList={bangsList} />
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

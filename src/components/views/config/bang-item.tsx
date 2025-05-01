import { RawBang } from "~/bang/source/types";
import { bangsNormalizer } from "~/logic/bangsNormalizer";

const BangItem = ({
  bang,
  bangIndex,
  className,
  ...rest
}: { bang: RawBang; bangIndex?: number } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => {
  const normalized = bangsNormalizer([bang])[0];

  const getQuery = (query: string) => {
    try {
      return {
        url: new URL(query),
        query,
      };
    } catch (e) {
      return { query };
    }
  };

  const { url, query } = getQuery(normalized.url);

  return (
    <div className="flex w-full flex-col items-start justify-start" {...rest}>
      {Object.keys(normalized).map((key) => {
        let value = (normalized as any)[key];

        if (key === "url" && url) {
          value = (
            <a
              href={url.toString()}
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-50 truncate no-underline hover:underline"
            >
              {query}
            </a>
          );
        }

        return (
          <div key={key} className="flex w-full gap-2 px-4 text-sm">
            <span className="w-42 font-semibold text-neutral-200 capitalize">
              {key}
            </span>
            <span className="flex w-full items-end justify-end text-neutral-400">
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BangItem;

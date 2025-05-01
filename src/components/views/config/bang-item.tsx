import type { NormalizedBang } from "~/logic/bangsNormalizer";

export type BangItemProps = {
  bang: NormalizedBang;
  url: URL;
  query: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const INTERNAL_BangItem = (props: BangItemProps) => {
  const { bang, url, query, className, ...rest } = props;

  return (
    <div className="flex w-full flex-col items-start justify-start" {...rest}>
      <BangItemContent {...props} />
    </div>
  );
};

const BangItemContent = ({ bang, url, query }: BangItemProps) => {
  return (
    <>
      {Object.keys(bang).map((key) => {
        let value = (bang as any)[key];

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
    </>
  );
};

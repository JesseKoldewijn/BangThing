export const getPageTitle = (title?: string) => {
  const titleVariant =
    title?.toLowerCase() === "home" || !title ? "absolute" : "relative";
  const titleVariants = {
    absolute: (_title?: string) => "BangThing - Jereko",
    relative: (title?: string) => `${title} | BangThing - Jereko`,
  };
  return titleVariants[titleVariant](title);
};

export const getPageDescription = (description?: string) => {
  const defaultDescription = "A better default search engine (with bangs!)";
  const descriptionVariant =
    description?.toLowerCase() === "home" || !description
      ? "absolute"
      : "relative";
  const descriptionVariants = {
    absolute: (_description?: string) => defaultDescription,
    relative: (description?: string) =>
      `${description} | ${defaultDescription}`,
  };
  return descriptionVariants[descriptionVariant](description);
};

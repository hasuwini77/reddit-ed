export const slugify = (text: string) => {
  return text
    .toLowerCase() // convert to lowercase
    .trim() // trim leading/trailing whitespace
    .replace(/[^\w\s-]/g, "") // remove non-word characters
    .replace(/[\s_]+/g, "-") // replace spaces and underscores with dashes
    .replace(/-+/g, "-"); // replace multiple dashes with a single one
};

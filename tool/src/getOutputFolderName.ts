import { PostSchemaType } from "./Post";

export function getOutputFolderName(post: PostSchemaType, folderPath: string) {
  const month =
    post.date.getUTCMonth() > 9
      ? post.date.getUTCMonth()
      : "0" + post.date.getUTCMonth().toString();

  const dateString = `${post.date.getUTCFullYear()}${month}${post.date.getUTCDate()}`;

  // Remove all punctuations and collapse whitespaces into a single dash
  // https://stackoverflow.com/a/4328546
  // Then make it all lowercase.
  const pathName = folderPath
    .replace(/[^\w\s\']|_/g, "")
    .replace(/\s+/g, "-")
    .split("")
    .map((c) => c.toLowerCase())
    .join("");

  return `${dateString}-${pathName}`;
}

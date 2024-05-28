import { resolve } from "path";
import { readFile } from "fs/promises";
import { customisedMarked } from "./customisedMarked";
import fm from "front-matter";
import { PostSchema } from "../types/Post";

/**
 * Read the raw Markdown file and parse it to get the front matter attributes,
 * the raw Markdown string and the transformed HTML string.
 */
export async function getPost(postFolderPath: string) {
  const file = await readFile(resolve(postFolderPath, "index.md"), {
    encoding: "utf8",
  });

  const parsedFile = fm(file);

  return {
    postAttributes: PostSchema.parse(parsedFile.attributes),
    postAsMarkdownString: parsedFile.body,
    postAsHtmlString: await customisedMarked.parse(parsedFile.body),
  };
}

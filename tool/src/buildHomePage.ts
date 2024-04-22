import path from "path";
import { writeFile } from "fs/promises";
import { generateHomeHtml } from "../../layout/index";

export async function buildHomePage(
  buildOutputFolderPath: string,
  posts: Array<string>
) {
  let links = "";
  for (const post of posts) {
    links += `<a href="/${post}/index.html"><p>${post}</p></a>`;
  }

  const fullHtmlPage = generateHomeHtml(links);

  await writeFile(
    path.resolve(buildOutputFolderPath, "index.html"),
    fullHtmlPage,
    { flag: "w" }
  );
}

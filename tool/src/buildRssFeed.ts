import { Feed } from "feed";
import { resolve } from "path";
import { writeFile } from "fs/promises";
import { defaultOpenGraphImageFileName } from "./utils/defaultOgpImageMetaTag";
import { createFolderIfDoesNotExist } from "./utils/createFolderIfDoesNotExist";
import { getConfig } from "./config";
import type { Post } from "./types/Post";
import type { Tags } from "./types/Tags";

const author = {
  name: "JJ",
  email: "jaimeloeuf@gmail.com",
  link: "https://jjss.quest",
};

export async function buildRssFeed(
  buildOutputFolderPath: string,
  posts: Array<Post>,
  tags: Tags,
) {
  const feed = new Feed({
    title: "JJ's Blog",
    description: "RSS Feed for JJ's Blog",
    id: getConfig().baseUrl,
    link: getConfig().baseUrl,
    language: "en",
    image: `${getConfig().baseUrl}/${defaultOpenGraphImageFileName}`,
    // favicon: `${getConfig().baseUrl}/favicon.ico`,
    copyright: "JJ",
    generator: "https://github.com/Jaimeloeuf/blog",
    author,
    feedLinks: {
      json: "feed/json",
      rss: "feed/rss",
      atom: "feed/atom",
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: post.absoluteUrl,
      link: post.absoluteUrl,
      date: post.date,
      image: post.keyImageAbsoluteUrl,
      // description: post.description,
      // content: post.content,
      category: post.tags.map(({ rawTag, tag }) => {
        const categoryUrl = `${getConfig().baseUrl}/tags/${tag}`;
        return {
          name: rawTag,
          term: rawTag,
          domain: categoryUrl,
          scheme: categoryUrl,
        };
      }),
      author: [author],
    });
  }

  const feedFolderPath = resolve(buildOutputFolderPath, "feed");
  await createFolderIfDoesNotExist(feedFolderPath);

  const rssFeedXmlPagePath = resolve(feedFolderPath, "rss2.rss");
  await writeFile(rssFeedXmlPagePath, feed.rss2());

  const rssFeedAtomPagePath = resolve(feedFolderPath, "atom.rss");
  await writeFile(rssFeedAtomPagePath, feed.atom1());

  return [rssFeedXmlPagePath, rssFeedAtomPagePath];
}

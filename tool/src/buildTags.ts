import type { Post } from "./types/Post";
import type { Tags } from "./types/Tags";

export function buildTags(posts: Array<Post>): Tags {
  return Object.values(posts)
    .map((post) => post.tags)
    .flat()
    .reduce((map, { tag, rawTag }) => {
      const tagObject = map.get(tag) ?? { rawTag, count: 0 };
      tagObject.count++;
      return map.set(tag, tagObject);
    }, new Map<string, { rawTag: string; count: number }>());
}

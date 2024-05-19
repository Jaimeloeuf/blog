import { readFileSync } from "fs";
import { resolve } from "path";

const cache = new Map<string, string>();

/**
 * idempotent `readFileSync` wrapper that caches after the first call.
 *
 * File name should be relative to `/tool/src/template/__FILE_NAME__`
 */
export function rfs(file: string) {
  let content = cache.get(file);

  if (content !== undefined) {
    return content;
  }

  content = readFileSync(resolve("./src/template", file), { encoding: "utf8" });
  cache.set(file, content);

  return content;
}

export function resetCache() {
  cache.clear();
}

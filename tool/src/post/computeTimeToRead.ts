import { readingTime } from "reading-time-estimator";

/**
 * Computes how long it takes to read this post and returns a formatted string.
 */
export function computeTimeToRead(postAsMarkdownString: string) {
  // Ensures that minutes is at least 1 min to prevent showing 0
  const minutes = Math.max(1, readingTime(postAsMarkdownString, 180).minutes);
  return `${minutes} ${minutes > 1 ? "minutes" : "minute"} read`;
}

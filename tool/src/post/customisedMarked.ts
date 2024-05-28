import { marked } from "marked";
import { generateHrFragment } from "../generateFragment";

marked.use({
  renderer: {
    hr: generateHrFragment,
  },
});

export const customisedMarked = marked;

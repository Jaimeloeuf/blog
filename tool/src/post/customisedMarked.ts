import { marked } from "marked";
import { createHrFragment } from "../generateFragment";

marked.use({
  renderer: {
    hr: createHrFragment,
  },
});

export const customisedMarked = marked;

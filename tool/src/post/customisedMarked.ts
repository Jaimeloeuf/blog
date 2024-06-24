import { marked } from "marked";
import { createHrFragment } from "../createFragment";

marked.use({
  renderer: {
    hr: createHrFragment,
  },
});

export const customisedMarked = marked;

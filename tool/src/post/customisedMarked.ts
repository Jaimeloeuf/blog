import { marked } from "marked";
import { createHrFragment } from "../__generated";

marked.use({
  renderer: {
    hr: createHrFragment,
  },
});

export const customisedMarked = marked;

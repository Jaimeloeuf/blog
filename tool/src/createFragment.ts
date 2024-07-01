import { rfs } from "./utils/rfs";

export const createFooterFragment = () => rfs("fragment/footer.html");

export const createHeaderFragment = () => rfs("fragment/header.html");

export const createHighlightJsFragment = () => rfs("fragment/highlightJS.html");

export const createScrollToTopButtonFragment = () =>
  rfs("fragment/scrollToTopButton.html");

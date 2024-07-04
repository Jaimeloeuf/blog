import { createOgpImageMetaTag } from "./createOgpImageMetaTag";

export const defaultOgpImageFilePath = "./src/assets/defaultOpenGraphImage.jpg";

/**
 * Compute the default OGP image tag only once on startup as we assume it does
 * not change for the lifetime of the program.
 */
export const defaultOgpImageMetaTag = createOgpImageMetaTag(
  defaultOgpImageFilePath,
  "defaultOpenGraphImage.jpg",
);

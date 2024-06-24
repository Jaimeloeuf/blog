import { imageSize } from "image-size";
import { createOgpImageMetaTag } from "./createOgpImageMetaTag";

/**
 * Compute the default OGP image's dimensions only once on startup as we assume
 * it does not change for the lifetime of the program.
 */
const defaultOpenGraphImageDimensions = imageSize(
  "./src/assets/defaultOpenGraphImage.jpg",
);

/**
 * Compute the default OGP image tag only once on startup as we assume it does
 * not change for the lifetime of the program.
 */
export const defaultOgpImageMetaTag = createOgpImageMetaTag(
  "defaultOpenGraphImage.jpg",
  defaultOpenGraphImageDimensions,
);

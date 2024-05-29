import { imageSize } from "image-size";

/**
 * Compute the default image's dimensions only once on startup as we assume it
 * does not change for the lifetime of the program.
 */
export const defaultOpenGraphImageDimensions = imageSize(
  "./src/assets/defaultOpenGraphImage.jpg",
);

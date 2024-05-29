import { resolve } from "path";
import { imageSize } from "image-size";
import { generateOgpImageMetaTag } from "./generateOgpImageMetaTag";
import { defaultOpenGraphImageDimensions } from "./defaultOpenGraphImageDimensions";

/**
 * Generate Open Graph Protocol's social preview image meta tag
 */
export function generateOgpImageMetaTagWithDefaultImage(
  folderName: string,
  postFolderPath: string,
  keyImage?: string,
) {
  if (keyImage === undefined) {
    return generateOgpImageMetaTag(
      "defaultOpenGraphImage.jpg",
      defaultOpenGraphImageDimensions.width,
      defaultOpenGraphImageDimensions.height,
    );
  }

  const { width, height } = imageSize(resolve(postFolderPath, keyImage));
  return generateOgpImageMetaTag(`${folderName}/${keyImage}`, width, height);
}

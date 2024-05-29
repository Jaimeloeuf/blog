import { basename } from "path";

/**
 * Get first asset (assume to always be image) to be used as main OG image. This
 * will return undefined if there is no assets copied over.
 */
export function getKeyImage(
  /**
   * Path of the assets after they have been copied into the output directory.
   */
  assetOutputPaths: string[],
) {
  const keyImage = assetOutputPaths.sort()[0];
  if (keyImage === undefined) {
    return;
  }

  return basename(keyImage);
}

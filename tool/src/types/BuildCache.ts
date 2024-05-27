import type { Tags } from "./Tags";

/**
 * Build Cache that can be passed into `build` to skip certain steps.
 */
export type BuildCache = {
  /**
   * Pass in to skip buildOutputFolder creation if it is already done before.
   */
  buildOutputFolderPath?: string;
  /**
   * Pass in to skip reading `postFolderItems` if it is unchanged.
   */
  postFolderItems?: Array<string>;
  /**
   * Pass in to skip rebuilding tags if it is already cached and unchanged.
   */
  tags?: Tags;
};

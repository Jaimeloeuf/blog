import { readFile } from "fs/promises";

/**
 * Get the hash of an existing generated file to do comparison
 */
export async function getHashOfExistingGeneratedFile(
  generatedFilePath: string,
) {
  // @todo The file might not always exist!
  const originalFile = await readFile(generatedFilePath, { encoding: "utf8" });

  const [_, originalFileHash] = originalFile.match(/sha256<([^}]+)>/) ?? [];

  return originalFileHash;
}

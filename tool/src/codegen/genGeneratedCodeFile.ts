import { createHash } from "node:crypto";
import { genGeneratedNotice } from "./genGeneratedNotice";

export function genGeneratedCodeFile(
  generator: Function,
  generatedCode: string,
) {
  const codeHash = createHash("sha256")
    .update(generatedCode)
    .digest()
    .toString("hex");

  const notice = genGeneratedNotice(generator, codeHash);

  return notice + generatedCode;
}

import * as prettier from "prettier";
import { createHash } from "node:crypto";
import { genGeneratedNotice } from "./genGeneratedNotice";

/**
 * Generate the full code file from the generator name and generated code.
 *
 * This function will
 * 1. Format the given code with prettier
 * 1. Create a sha256 hash in hexcode for your generated code
 * 1. Create the generated code warning/notice
 * 1. Combine all of these and return the final full source code back
 */
export async function genGeneratedCodeFile(
  generator: Function,
  generatedCode: string,
) {
  const generatedCodeAfterFormatting = await prettier.format(generatedCode, {
    // Use this to trick prettier to use a TS parser automatically
    filepath: ".ts",
    plugins: ["prettier-plugin-tailwindcss"],
  });

  const codeHash = createHash("sha256")
    .update(generatedCodeAfterFormatting)
    .digest()
    .toString("hex");

  const notice = genGeneratedNotice(generator, codeHash);

  return notice + generatedCodeAfterFormatting;
}

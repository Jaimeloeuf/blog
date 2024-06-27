import { genGeneratedNotice } from "./genGeneratedNotice";

export function genGeneratedCodeFile(
  generator: Function,
  generatedCode: string,
) {
  const notice = genGeneratedNotice(generator);

  return notice + generatedCode;
}

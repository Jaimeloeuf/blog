export function genGeneratedNotice(generator: Function, codeHash: string) {
  return `/**
 * ********************* THIS IS A GENERATED FILE *****************************
 * ********************* DO NOT MODIFY OR FORMAT MANUALLY *********************
 *
 * This file is automatically generated with the module:
 * ${generator.name}
 *
 * Generated sha256 hash in hex for code after this section is:
 * ${codeHash}
 */
`;
}

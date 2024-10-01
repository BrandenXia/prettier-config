import type { Config as PrettierConfig } from "prettier";

type PrettierConfigOptions = {
  importAliases?: string[];
  tailwind?: boolean;
  tailwindFunctions?: string[];
};

const prettierConfigFactory = ({
  importAliases = ["@"],
  tailwind = false,
  tailwindFunctions = ["cn"],
}: PrettierConfigOptions): PrettierConfig => {
  const config: PrettierConfig = {
    semi: true,
    singleQuote: false,
    trailingComma: "all",
    printWidth: 100,
    tabWidth: 2,
    plugins: ["prettier-package-json", "@ianvs/prettier-plugin-sort-imports"],
    importOrder: [
      "<THIRD_PARTY_MODULES>",
      "<TYPES>",
      "<TYPES>^[.]",
      "",
      ...[...importAliases].map((alias) => `^${alias}/(.*)$`),
      "^@(.*)/(.*)$",
      "",
      "^[./]",
      "",
      "^(?!.*[.]css$)[./].*$",
      ".css$",
    ],
  };

  if (!config.plugins) config.plugins = [];

  if (tailwind) config.plugins.push("prettier-plugin-tailwindcss");
  if (tailwind && tailwindFunctions)
    config.tailwindFunctions = tailwindFunctions;

  return config;
};

export default prettierConfigFactory;
export type { PrettierConfigOptions };

import { printBangs } from "./print";

export const printBangsPlugin = () => {
  const config = {
    name: "print-bangs",
    closeBundle: async () => {
      await printBangs();
    },
  };

  return config;
};

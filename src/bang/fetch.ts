import { BANGS_PUBLIC_PATH } from "../constants/defaults";
import type { bangs as bangsSource } from "./source";

const isServer = () => typeof window === "undefined";

export const fetchBangs = async () => {
  const isServerEnv = isServer();
  if (isServerEnv) return;

  const response = await fetch(BANGS_PUBLIC_PATH, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bangs");
  }

  return (await response.json()) as typeof bangsSource;
};

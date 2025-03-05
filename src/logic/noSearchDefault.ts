import { getElementByElemID } from "../utils/element";

export const noSearchDefault = async () => {
  const copyButton = getElementByElemID<HTMLButtonElement>("copy-button");
  const copyIcon = copyButton?.querySelector("img");
  const urlInput = getElementByElemID<HTMLInputElement>("url-input");
  const urlContainer = getElementByElemID<HTMLDivElement>("url-container");

  if (copyButton && urlInput && urlContainer && copyIcon) {
    urlContainer.addEventListener("click", async () => {
      await navigator.clipboard.writeText(urlInput.value);
      copyIcon.src = "/clipboard-check.svg";

      setTimeout(() => {
        copyIcon.src = "/clipboard.svg";
      }, 2000);
    });
  }
};

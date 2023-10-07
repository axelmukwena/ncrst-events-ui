/**
 * Downloads an API key as a JSON file.
 * @param {string | null} apiKey - The API key to download.
 */
export const downloadApiKey = (apiKey: string | null): void => {
  if (typeof document === "undefined" || !apiKey) return;

  const apiKeyObj = { new_api_key: apiKey };
  const blob = new Blob([JSON.stringify(apiKeyObj)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "daaily-sally-api-key.json";
  a.click();
  URL.revokeObjectURL(url);
};

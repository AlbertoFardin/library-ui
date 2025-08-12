/**
 * Updates or adds a parameter to the URL with the specified value.
 * @param {string} url - The URL to update. If empty, it will be treated as a base URL.
 * @param {string} paramName - The name of the parameter to add or update.
 * @param {string} paramValue - The value to set for the parameter.
 * @returns {string} - The updated URL.
 */
export const updateQueryParam = (
  url: string,
  paramName: string,
  paramValue: string,
): string => {
  const [baseUrl, query] = (url || "").split("?");
  const queryParams = new URLSearchParams(query);
  queryParams.set(paramName, paramValue);
  return `${baseUrl}?${queryParams.toString()}`;
};

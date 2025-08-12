import { updateQueryParam } from "../../../utils/updateQueryParam";

/**
 * Returns signed URL only if the signature request is accepted; otherwise the original URL.
 * @param url
 * @param authorization
 * @param withAuthorizationHeader
 * @returns
 */
const getSignedUrl = async (
  url: string,
  authorization: string,
  withAuthorizationHeader: boolean,
): Promise<string> => {
  try {
    const calledUrl = withAuthorizationHeader
      ? updateQueryParam(url, "redirect", "false")
      : url;

    const response = await fetch(calledUrl, {
      credentials: withAuthorizationHeader ? "same-origin" : "include",
      headers: {
        Authorization: withAuthorizationHeader ? authorization : "",
      },
    });

    // Check if the request was successful
    if (!response.ok) throw "NOT_OK";

    const data = await response.text();
    return JSON.parse(data);
  } catch {
    console.info(`Fail to sign, return original URL: ${url}`);
    return url;
  }
};

export default getSignedUrl;

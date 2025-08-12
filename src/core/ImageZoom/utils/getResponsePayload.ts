import getErrorMsg from "../../../utils/getErrorMsg";

export interface ResponsePayload {
  content: string;
  type: string;
}

const RETRY_DELAY = 3000;

const getResponsePayload = async ({
  url,
  authorization,
  urlFirmed,
}: {
  url: string;
  authorization?: string;
  urlFirmed: boolean;
}): Promise<ResponsePayload> => {
  let response: Response;
  try {
    if (urlFirmed || !authorization) {
      // l'url firmato è sempre univoco quindi il retry se ne crea uno nuovo
      response = await fetch(url, {
        method: "GET",
      });
    } else {
      response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: authorization,
          Origin: `${window.location.origin}`,
        },
      });
    }
  } catch (err) {
    await new Promise((r) => setTimeout(r, RETRY_DELAY));
    const error = await getErrorMsg(err);
    console.error(`Failed to get content from ${url}: `, error);
  }
  const responseText = await response.text();
  if (response.status === 401) {
    throw new Error(
      `Unauthorized: Token might be expired or invalid (401): ${responseText}`,
    );
  }
  if (!response.ok) {
    throw new Error(
      `Error fetching the data: ${response.statusText} (status code: ${response.status})`,
    );
  }
  return { content: responseText, type: response.headers.get("Content-Type") };
};

export default getResponsePayload;

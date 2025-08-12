import { buildInternalServerError } from "./utils";
import { ApiGWError } from "./utils/ApiGWError";
export interface IApiGWCaller {
  doCall: <TReq, TRes>({
    url,
    method,
    data,
    withCredentials,
    authorization,
  }: {
    url: string;
    method: string;
    data: TReq;
    withCredentials: boolean;
    authorization?: string;
  }) => Promise<TRes>;
}

export interface IApiGWCallerProps {
  baseUrl: string;
  retries?: number; // retry numbers on server error
  retryDelay?: number; // retry delay on server error
}

export const ApiGWCaller = ({
  baseUrl,
  retries = 3,
  retryDelay = 1000,
}: IApiGWCallerProps): IApiGWCaller => {
  const doCall = async <TReq, TRes>({
    url,
    method,
    data,
    withCredentials,
    authorization = null,
  }: {
    url: string;
    method: string;
    data: TReq;
    withCredentials: boolean;
    authorization?: string;
  }): Promise<TRes> => {
    let attempt = 0;

    while (attempt < retries) {
      try {
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
        if (authorization) {
          headers["Authorization"] = authorization;
        }

        const options: RequestInit = {
          method,
          headers,
          body: data ? JSON.stringify(data) : undefined,
          credentials: withCredentials ? "include" : undefined,
        };

        const response = await fetch(`${baseUrl}${url}`, options);

        if (!response.ok) {
          const statusCode = response.status;
          const responseData = await response.json().catch(() => ({}));

          if (statusCode >= 400 && statusCode < 500) {
            throw new ApiGWError({
              status: statusCode,
              statusText: response.statusText,
              error: responseData?.error || [],
              code: responseData?.code || "BAD_REQUEST",
            });
          }

          attempt++;
          if (attempt >= retries) {
            console.error(
              `Call to ${url} failed after ${retries} attempts with status ${statusCode}: ${
                response.statusText || "Unknown error"
              }`,
            );
            throw buildInternalServerError(statusCode, response.statusText);
          }

          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          continue;
        }

        return (await response.json()) as TRes;
      } catch (error) {
        if (error.code && error.error) {
          throw error;
        }
        console.error(`Call to ${url} failed!`, error);
        throw buildInternalServerError(500, "Unknown error");
      }
    }

    throw buildInternalServerError(500, "Max retry attempts exceeded");
  };

  return {
    doCall,
  };
};

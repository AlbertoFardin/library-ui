import { ERROR_GENERIC } from "../../constants";
import { ApiGWError } from "./ApiGWError";
import { IErrorResponse } from "./interfaces";

const buildInternalServerError = (
  status: number,
  statusText: string,
): IErrorResponse => {
  return new ApiGWError({
    status,
    statusText,
    error: [ERROR_GENERIC],
    code: "INTERNAL_SERVER_ERROR",
  });
};

export default buildInternalServerError;

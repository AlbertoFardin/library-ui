import { IErrorResponse } from "./interfaces";

export class ApiGWError extends Error implements IErrorResponse {
  status: number;
  statusText: string;
  error: string[];
  code: string;

  constructor({ status, statusText, error, code }: IErrorResponse) {
    super(statusText);
    this.status = status;
    this.statusText = statusText;
    this.error = error;
    this.code = code;
  }
}

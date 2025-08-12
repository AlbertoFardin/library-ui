import { IErrorResponse } from "./interfaces";

export const isIErrorResponse = (error: unknown): error is IErrorResponse =>
  typeof error === "object" && error !== null && "error" in error;

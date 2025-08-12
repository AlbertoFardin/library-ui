import { Initialize } from "../interfaces";

const inLoading = (i: Initialize): boolean =>
  new Set([Initialize.START, Initialize.WAIT]).has(i);

export default inLoading;

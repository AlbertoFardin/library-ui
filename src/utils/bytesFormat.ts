import * as bytes from "bytes";

const bytesFormat = (n: number): string => {
  return bytes.format(n, { unitSeparator: " " });
};

export default bytesFormat;

import { ReactElement } from "react";

const isDOMElement = (type: ReactElement["type"]): boolean =>
  typeof type === "string";

export default isDOMElement;

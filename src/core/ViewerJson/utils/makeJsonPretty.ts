import { defaultIndentWidth } from "./constants";
import parseJson from "./parseJson";

export interface IMakePrettyParam {
  value: string | null;
  indentWidth?: number;
}

/** make pretty only if value is a valid json */
const makeJsonPretty = ({
  value,
  indentWidth = defaultIndentWidth,
}: IMakePrettyParam): string => {
  if (value == null || value.length == 0) return value;
  const parseJsonResult = parseJson(value);
  if (parseJsonResult.success === true) {
    return JSON.stringify(parseJsonResult.jsonObject, null, indentWidth);
  } else {
    return value;
  }
};

export default makeJsonPretty;

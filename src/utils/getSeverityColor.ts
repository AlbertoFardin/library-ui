import { Severity } from "../interfaces";
import { getTheme } from "../theme";

const getSeverityColor = (s: Severity): string => {
  switch (s) {
    case Severity.DEFAULT:
      return getTheme().colors.theme1;
    case Severity.SUCC:
      return getTheme().colors.msgSucc;
    case Severity.WARN:
      return getTheme().colors.msgWarn;
    case Severity.FAIL:
      return getTheme().colors.msgFail;
    default:
      return getTheme().colors.msgInfo;
  }
};

export default getSeverityColor;

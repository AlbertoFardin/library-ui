import { Severity } from "../interfaces";

const getSeverityIcon = (s: Severity): string => {
  switch (s) {
    case Severity.DEFAULT:
      return "";
    case Severity.SUCC:
      return "check_circle";
    case Severity.INFO:
      return "info";
    case Severity.WARN:
      return "warning";
    case Severity.FAIL:
      return "error";
    default:
      return "";
  }
};

export default getSeverityIcon;

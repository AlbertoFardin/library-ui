import * as moment from "moment";
import TypeCell from "./TypeCell";
import { DATE_FORMAT } from "../../constants";
import bytesFormat from "../../utils/bytesFormat";

const getValueString = (v, type: TypeCell) => {
  try {
    if (v === null || v === undefined || v === "") return "";
    switch (type) {
      case TypeCell.SimpleDate:
        const dateS = moment(v).format(DATE_FORMAT);
        return dateS === "Invalid date" ? "" : dateS;
      case TypeCell.Timestamp:
        const dateT = moment(v).format(`${DATE_FORMAT} HH:mm`);
        return dateT === "Invalid date" ? "" : dateT;
      case TypeCell.Bool:
        if (typeof v !== "boolean") return "";
        return !!v ? "Yes" : "No";
      case TypeCell.MultipleString:
        return v.join(", ");
      case TypeCell.DictionaryEntry:
      case TypeCell.DictionaryEntries:
        return v
          .map(({ value }) => value)
          .sort()
          .join(", ");
      case TypeCell.Percentage:
        const valueRounded = Math.round((v + Number.EPSILON) * 100) / 100;
        return !v ? "0%" : `${valueRounded}%`;
      case TypeCell.Category:
        return v
          .map(({ label }) => label)
          .sort()
          .join(", ");
      case TypeCell.Number:
        return JSON.stringify(v);
      case TypeCell.Byte:
        return bytesFormat(v);
      default:
        throw "";
    }
  } catch {
    return typeof v === "string" ? v : JSON.stringify(v);
  }
};

export default getValueString;

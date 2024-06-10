import clearFilterValue from "../../utils/clearFilterValue";
import IFilterBoolean from "../IFilterBoolean";

export const isBooleanFiltered = (filter: IFilterBoolean) => {
  return typeof filter.value === "boolean";
};

export const clearBooleanFilter = (filter: IFilterBoolean) => {
  return clearFilterValue(filter) as IFilterBoolean;
};

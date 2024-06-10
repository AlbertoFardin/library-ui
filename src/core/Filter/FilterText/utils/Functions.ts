import isEmpty from "lodash-es/isEmpty";
import clearFilterValue from "../../utils/clearFilterValue";
import IFilterText, { TextValue } from "../IFilterText";

export const prepareValue = (value: TextValue = ""): string => {
  if (typeof value === "string") return value;
  return String(
    JSON.parse(
      JSON.stringify(
        value.reduce((acc, cur, i) => (!i ? cur : `${acc}\n${cur}`), ""),
      ),
    ),
  );
};

export const prepareBadge = (value: TextValue = ""): number => {
  if (!value) return 0;
  if (typeof value === "string") return 1;
  return value.filter((s) => !!s).length;
};

export const clearTextFilter = (filter: IFilterText) => {
  const filterCleaned = clearFilterValue(filter) as IFilterText;
  if (filterCleaned.switchNoValue === true) {
    filterCleaned.switchNoValue = false;
  }
  if (filterCleaned.switchExactValue === true) {
    filterCleaned.switchExactValue = false;
  }
  if (filterCleaned.switchCaseSensitive === true) {
    filterCleaned.switchCaseSensitive = false;
  }
  return filterCleaned;
};

export const isTextFiltered = (filter: IFilterText) => {
  if (!!filter.switchNoValue) return true;
  return !isEmpty(filter.value);
};

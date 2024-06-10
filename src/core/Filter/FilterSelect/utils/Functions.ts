import IFilterSelect from "../IFilterSelect";
import clearFilterValue from "../../utils/clearFilterValue";
import isEmpty from "lodash-es/isEmpty";

export const isSelectFiltered = (filter: IFilterSelect) => {
  return !isEmpty(filter.value);
};

export const clearSelectFilter = (filter: IFilterSelect) => {
  return clearFilterValue(filter) as IFilterSelect;
};

import isEmpty from "lodash-es/isEmpty";
import IFilterSelect from "../IFilterSelect";
import clearFilterValue from "../../utils/clearFilterValue";

export const isSelectFiltered = (filter: IFilterSelect) => {
  return !isEmpty(filter.value);
};

export const clearSelectFilter = (filter: IFilterSelect) => {
  return clearFilterValue(filter) as IFilterSelect;
};

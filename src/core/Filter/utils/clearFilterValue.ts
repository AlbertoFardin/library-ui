import { IFilterBase } from "../interfaces";

const clearFilterValue = <T, C>(filter: IFilterBase<T, C>) => {
  const filterClean = { ...filter, value: undefined };
  return filterClean;
};

export default clearFilterValue;

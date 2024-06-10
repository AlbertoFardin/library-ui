import { ISort, ISortOrder } from "../../../interfaces";

export const getIndexSort = (
  id: string,
  sortList: ISort[],
): { index: number; sorted: boolean } => {
  const index = sortList.findIndex((x) => x.id === id);
  return {
    index,
    sorted: index > -1,
  };
};

export const calculateNextSort = (currentSort: ISortOrder): ISortOrder => {
  switch (currentSort) {
    case ISortOrder.NONE:
      return ISortOrder.ASC;
    case ISortOrder.ASC:
      return ISortOrder.DESC;
    case ISortOrder.DESC:
      return ISortOrder.NONE;
    default:
      return ISortOrder.NONE;
  }
};

export const commonSortAction = (
  sortObj: ISort,
  sortList: ISort[],
  sortable: boolean,
  foundSort,
  enableMultiSort: boolean,
): ISort[] => {
  if (!sortable) {
    return undefined;
  }

  // the column were already in sorting -> change the sort order
  if (foundSort.sorted) {
    sortList.splice(foundSort.index, 1, sortObj);
    return sortList;
  }

  if (enableMultiSort) {
    // the column were not already in sorting -> add column to sort
    return [...sortList, sortObj];
  }

  // set single sorting
  return [sortObj];
};

export const arrowSortAction = (
  actionType: ISortOrder,
  id: string,
  label: string,
  sortList: ISort[],
  sortable: boolean,
  enableMultiSort: boolean,
): ISort[] => {
  if (!sortable) {
    return undefined;
  }

  const copySort = [...sortList];
  const foundSort = getIndexSort(id, copySort);

  // if sorting of this column is set and is the same of the action -> remove the current sort
  if (foundSort.sorted && copySort[foundSort.index].order === actionType) {
    copySort.splice(foundSort.index, 1);
    return copySort;
  }

  const sortObj: ISort = { id, label, order: actionType };
  return commonSortAction(
    sortObj,
    copySort,
    sortable,
    foundSort,
    enableMultiSort,
  );
};

export const getColumnsFromMove = ({ columnsSets, columns }) => {
  const columnSet = columnsSets.find((el) => el.active);
  const newColumnSet = { ...columnSet, columns };
  return columnsSets.map((el) =>
    el.id === newColumnSet.id ? newColumnSet : el,
  );
};

export const getColumnsFromResize = ({ columnsSets, sizes }) => {
  const activeColSet = columnsSets.find((colSet) => colSet.active);
  const updatedColumns = activeColSet.columns.map((col, i) => ({
    ...col,
    width: sizes[i] ? sizes[i] : col.width,
  }));
  const updatedColSet = { ...activeColSet, columns: updatedColumns };
  return columnsSets.map((colSet) =>
    colSet.id === updatedColSet.id ? updatedColSet : colSet,
  );
};

export const getColumns = (userColumns, modelColumns) =>
  userColumns.map((uCol) => {
    const mCol = modelColumns.find((mC) => uCol.id === mC.id);
    return { ...mCol, width: uCol.width || mCol.width };
  });

export const getInitialItems = ({
  infiniteScroll = false,
  itemsNew = [],
  itemsOld = [],
  total = 0,
}) => {
  if (!infiniteScroll) {
    return itemsNew;
  }

  const newArray = new Array(total);
  newArray.fill(null);
  itemsNew.map((elNew, i) => {
    const elOldIndex = itemsOld.findIndex(
      (elOld) => !!elOld && elOld.id === elNew.id,
    );
    const index = Math.max(elOldIndex, i);
    newArray[index] = elNew;
  });
  return newArray;
};

export const getUpdateItems = ({
  total = 0,
  itemsOld = [],
  itemsNew = [],
  from = 0,
}) => {
  const newArray = new Array(total);
  newArray.fill(null);
  itemsOld.map((item, index) => {
    newArray[index] = item;
  });
  itemsNew.map((item, index) => {
    newArray[from + index] = item;
  });
  return newArray;
};

export const getActiveColumnSet = (columnsSets) => {
  if (!columnsSets) return null;
  return columnsSets.find((el) => el.active) || columnsSets[0];
};

export const getTotalPage = (totalItems, itemForpage) => {
  const total = Math.floor(totalItems / itemForpage);
  return !(totalItems % itemForpage) ? total : total + 1;
};

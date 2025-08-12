export const multiselectCtrl = (
  idsSelected: string[],
  itemId: string,
): string[] => {
  const array = Array.from(idsSelected);
  const indexToRemove = array.findIndex((id) => id === itemId);

  if (indexToRemove === -1) {
    array.push(itemId);
  } else {
    array.splice(indexToRemove, 1);
  }

  return array;
};

export const multiselectMeta = (
  idsSelected: string[],
  idsTotal: string[],
  indexSlcFrom: number,
  indexSlcTo: number,
): string[] => {
  const array = Array.from(idsSelected);

  const idsToAdd = idsTotal.filter((_, index) => {
    if (indexSlcFrom < indexSlcTo) {
      return index >= indexSlcFrom && index <= indexSlcTo;
    }
    return index <= indexSlcFrom && index >= indexSlcTo;
  });

  idsToAdd.forEach((idToAdd) => {
    const notSelected = !array.find((id) => id === idToAdd);
    if (notSelected) array.push(idToAdd);
  });

  return array;
};

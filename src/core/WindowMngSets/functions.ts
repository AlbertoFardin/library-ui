import { Initialize } from "../../interfaces";
import { IMngSet } from "./interfaces";

export const updateSetsAfterRemove = (
  sets: IMngSet[],
  newSet: IMngSet,
): IMngSet[] => {
  const newArray = Array.from(sets);
  const index = newArray.findIndex((s) => s.id === newSet.id);
  newArray.splice(index, 1);
  return newArray;
};
export const updateSetsAfterCreate = (
  sets: IMngSet[],
  newSet: IMngSet,
): IMngSet[] => {
  const newArray = Array.from(sets);
  newArray.unshift(newSet);
  return newArray;
};
export const updateSetsAfterModify = (
  sets: IMngSet[],
  newSet: IMngSet,
): IMngSet[] => {
  const newArray = Array.from(sets);
  const index = newArray.findIndex((s) => s.id === newSet.id);
  newArray.splice(index, 1, newSet);
  return newArray;
};

interface IGetLoadingData {
  loading: boolean;
  initCreate: Initialize;
  initRemove: Initialize;
  initUpdate: Initialize;
  initShared: Initialize;
  initCloned: Initialize;
}
export const getLoadingData = ({
  loading,
  initCreate,
  initRemove,
  initUpdate,
  initShared,
  initCloned,
}: IGetLoadingData): [boolean, string] => {
  let loadingBool = loading;
  let loadingText = "";

  if (initCreate === Initialize.LOADING) {
    loadingBool = true;
    loadingText = "Creating";
  }
  if (initRemove === Initialize.LOADING) {
    loadingBool = true;
    loadingText = "Removing";
  }
  if (initUpdate === Initialize.LOADING) {
    loadingBool = true;
    loadingText = "Saving";
  }
  if (initShared === Initialize.LOADING) {
    loadingBool = true;
    loadingText = "Sharing";
  }
  if (initCloned === Initialize.LOADING) {
    loadingBool = true;
    loadingText = "Cloning";
  }

  return [loadingBool, loadingText];
};

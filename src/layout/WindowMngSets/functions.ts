import { Initialize, ShareType } from "../../interfaces";
import { IMngChipValue, IMngSet, IMngSetPayload } from "./interfaces";

export const updateSetsAfterRemove = (
  sets: IMngSet[],
  setId: string,
): IMngSet[] => {
  const newArray = Array.from(sets);
  const index = newArray.findIndex((s) => s.id === setId);
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
export const updateSetsAfterShare = (
  sets: IMngSet[],
  setId: string,
  share: boolean,
): [IMngSet[], IMngSet] => {
  const newArray = Array.from(sets);
  const index = newArray.findIndex((s) => s.id === setId);
  const oldSet = newArray[index];
  const newSet: IMngSet = {
    ...oldSet,
    version: oldSet.version + 1,
    shareType: share ? ShareType.SHARE_UPD : ShareType.PRIVATE,
  };
  newArray.splice(index, 1, newSet);
  return [newArray, newSet];
};

interface IGetLoadingData {
  loading: boolean;
  initialize: Initialize;
  initCreate: Initialize;
  initRemove: Initialize;
  initUpdate: Initialize;
  initSharedUpsert: Initialize;
  initSharedDelete: Initialize;
  initLevels: Initialize;
  needSaveEditor: boolean;
  needSaveLevels: boolean;
}
export const getLoadingData = ({
  loading,
  initialize,
  initCreate,
  initRemove,
  initUpdate,
  initSharedUpsert,
  initSharedDelete,
  initLevels,
  needSaveEditor,
  needSaveLevels,
}: IGetLoadingData): [boolean, string] => {
  let loadingBool = needSaveEditor || needSaveLevels;
  let loadingText = "";
  const l = new Set([Initialize.START, Initialize.WAIT]);

  if (loading || l.has(initialize)) {
    loadingBool = true;
    loadingText = "Loading";
  }
  if (l.has(initCreate)) {
    loadingBool = true;
    loadingText = "Creating";
  }
  if (l.has(initRemove)) {
    loadingBool = true;
    loadingText = "Removing";
  }
  if (l.has(initUpdate)) {
    loadingBool = true;
    loadingText = "Saving";
  }
  if (l.has(initSharedUpsert)) {
    loadingBool = true;
    loadingText = "Sharing";
  }
  if (l.has(initSharedDelete)) {
    loadingBool = true;
    loadingText = "Unsharing";
  }
  if (l.has(initLevels)) {
    loadingBool = true;
    loadingText = "Saving";
  }
  return [loadingBool, loadingText];
};

export const cleanSets = (
  setsDirty: IMngSet[],
  chipValues: IMngChipValue[],
): IMngSet[] => {
  const chips = new Set(chipValues.map((c) => c.id));
  return setsDirty.map((s) => {
    const newSetPayload: IMngSetPayload = {
      itemsSort: s.payload.itemsSort || [],
      items: s.payload.items.filter((i) => chips.has(i.id)),
      label: s.payload.label,
    };
    const setSet: IMngSet = {
      id: s.id,
      version: s.version || 0,
      ownerId: s.ownerId,
      created: s.created,
      updated: s.updated,
      payload: newSetPayload,
      shareType: s.shareType || ShareType.PRIVATE,
    };
    return setSet;
  });
};

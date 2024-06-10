import { ISortOrder } from "../../interfaces";
import { IChip } from "../Chip";

export interface IMngSetUser {
  id: string;
  name: string;
  avatar: string;
  avatarIcon: string;
  avatarText: string;
}

export enum WINDOW_PANELS {
  HOME = "HOME",
  EDITOR = "EDITOR",
  SHARED = "SHARED",
}

export interface IMngSetPayloadItem {
  id: string;
  [decorateKey: string]: unknown;
}
export interface IMngSetPayload {
  label: string;
  items: IMngSetPayloadItem[];
  itemSorts?: { id: string; order?: ISortOrder }[];
}
export interface IMngSet {
  id: string;
  ownerId: string;
  created: number;
  updated: number;
  payload: IMngSetPayload;
}
export interface IMngChipValue {
  id: string;
  icon?: string;
  label?: string;
  tooltip?: string;
  groupId?: string;
  mandatory?: boolean;
}

export interface IMngChipGroup {
  id: string;
  label: string;
}

export interface IWindowMngSets {
  colorOwner?: string;
  colorShare?: string;
  open?: boolean;
  titleText: string;
  titleInfo: string | string[];
  positionX?: number;
  positionY?: number;
  loading?: boolean;
  ownerId: string;
  sets: IMngSet[];
  selectedId: string;
  chipMaxSlc?: number;
  chipValues: IMngChipValue[];
  chipGroups: IMngChipGroup[];
  context: string;
  onClose: () => void;
  onCreateSet: (
    context: string,
    setId: string,
    setPayload: IMngSetPayload,
  ) => Promise<IMngSet>;
  onSharedSet: (
    context: string,
    setId: string,
    setPayload: IMngSetPayload,
  ) => Promise<void>;
  onRemoveSet: (
    context: string,
    setId: string,
    setPayload: IMngSetPayload,
  ) => Promise<void>;
  onUpdateSet: (
    context: string,
    setId: string,
    setPayload: IMngSetPayload,
  ) => Promise<void>;
  onSetsChanged: (context: string, selectedId: string, sets: IMngSet[]) => void;
  getSharedSets: (context: string) => Promise<IMngSet[]>;
  getChip?: (chipValue: IMngChipValue, set: IMngSetPayload) => IChip;
  getUser?: (userId: string) => IMngSetUser;
  onError?: (error: string) => void;
  dateFormat?: string;
}

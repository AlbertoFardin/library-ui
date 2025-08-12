import { IMngItem, ISortOrder } from "../../interfaces";
import { IChip } from "../../core/Chip";

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
  LEVELS = "LEVELS",
}

export interface IMngSetPayloadItem {
  id: string;
  [decorateKey: string]: unknown;
}
export interface IMngSetPayload {
  label: string;
  items: IMngSetPayloadItem[];
  itemsSort?: { id: string; order: ISortOrder }[];
}

export interface IMngSet extends IMngItem<IMngSetPayload> {}
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

export interface IMngLevel {
  id: string;
  label: string;
  setId: string;
}

export interface IWindowMngSets {
  colorOwner?: string;
  colorShare?: string;
  open: boolean;
  titleText: string;
  titleInfo: string | string[];
  positionX: number;
  positionY: number;
  context: string;
  loading: boolean;
  ownerId: string;
  sets: IMngSet[];
  selectedId: string;
  chipMaxSlc: number;
  chipValues: IMngChipValue[];
  chipGroups: IMngChipGroup[];
  onClose: () => void;
  onCreateSet: (context: string, payload: IMngSetPayload) => Promise<IMngSet>;
  onRemoveSet: (context: string, id: string) => Promise<void>;
  onUpdateSet: (context: string, set: IMngSet) => Promise<IMngSet>;
  onSetsChanged: (context: string, selectedId: string, sets: IMngSet[]) => void;
  getChip?: (
    chipValue: IMngChipValue,
    set: IMngSetPayload,
    shared: boolean,
  ) => IChip;
  getUser?: (userId: string) => IMngSetUser;
  onError?: (error: string) => void;
  dateFormat?: string;
  //
  // --- shared
  enableShared?: boolean;
  onSharedUpsert?: (context: string, setId: string) => Promise<void>;
  onSharedDelete?: (context: string, setId: string) => Promise<void>;
  getItemsShared?: (context: string) => Promise<IMngSet[]>;
  //
  // --- levels
  enableLevels?: boolean;
  onLevelsUpdate?: (context: string, levels: IMngLevel[]) => Promise<void>;
  getItemsLevels?: (context) => Promise<IMngLevel[]>;
}

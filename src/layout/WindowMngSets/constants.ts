import { v4 as uuidv4 } from "uuid";
import { IMngSetPayload } from "./interfaces";

export const CLS_DRAGING = `windowmngsetsDrag_${uuidv4()}`;

export const WINDOW_WIDTH = 340;
export const WINDOW_HEIGHT_MIN = 220;
export const WINDOW_HEIGHT_MAX = 505;

export const MAX_SET_COUNT = 20;

export const DRAFT_PAYLOAD: IMngSetPayload = {
  label: "My new Set",
  items: [],
};

export const ERROR_MAX_SETS = [
  "You have reached the maximum number of Sets",
  "Please delete a Set in order to create a new one",
];

export const ERROR = {
  update: "Unable update Set, please refresh and retry",
  create: "Unable create a new Set, please refresh and retry",
  remove: "Unable remove Set, please refresh and retry",
  shared: "Unable share Set, please refresh and retry",
  levels: "Unable update your preferences levels",
  getSharedlist: "Unable load list of public Sets",
  getLevelslist: "Unable load preferences of levels",
};

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
export const ERROR_UPDATE = "Unable update Set, please refresh and retry";
export const ERROR_SHARE = "Unable share the Set, please refresh and retry";
export const ERROR_GET_SHARE =
  "Unable get shared Sets, please refresh and retry";

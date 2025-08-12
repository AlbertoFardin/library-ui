import { IMngSet } from "./interfaces";
import {
  updateSetsAfterRemove,
  updateSetsAfterCreate,
  updateSetsAfterModify,
  updateSetsAfterShare,
} from "./functions";
import { ShareType } from "../../interfaces";

const SET_DEFAULT: IMngSet = {
  id: "1",
  payload: {
    label: "label",
    items: [],
  },
  version: 0,
  updated: 0,
  created: 0,
  ownerId: "ownerId",
  shareType: ShareType.PRIVATE,
};
const sets: IMngSet[] = [1, 2, 3, 4, 5].map((n) => ({
  ...SET_DEFAULT,
  id: String(n),
}));

describe("WindowMngSets - functions", () => {
  test("updateSetsAfterRemove", () => {
    const newSets = updateSetsAfterRemove(sets, "3");
    const newSetsId = newSets.map((s) => s.id);
    expect(4).toEqual(newSetsId.length);
    expect(["1", "2", "4", "5"]).toEqual(newSetsId);
  });

  test("updateSetsAfterCreate", () => {
    const set: IMngSet = { ...SET_DEFAULT, id: "NEW_SET" };
    const newSets = updateSetsAfterCreate(sets, set);
    const newSetsId = newSets.map((s) => s.id);
    expect(6).toEqual(newSetsId.length);
    expect(["NEW_SET", "1", "2", "3", "4", "5"]).toEqual(newSetsId);
  });

  test("updateSetsAfterModify", () => {
    const set: IMngSet = {
      ...SET_DEFAULT,
      id: "3",
      payload: { label: "NEW_LABEL", items: [{ id: "item_id" }] },
    };
    const newSets = updateSetsAfterModify(sets, set);
    expect(5).toEqual(newSets.length);
    expect(set).toEqual(newSets[2]);
  });

  test("updateSetsAfterShare true", () => {
    const [newSets, newSet] = updateSetsAfterShare(sets, "3", true);
    expect(5).toEqual(newSets.length);
    expect(ShareType.SHARE_UPD).toEqual(newSet.shareType);
  });

  test("updateSetsAfterShare false", () => {
    const [newSets, newSet] = updateSetsAfterShare(sets, "3", false);
    expect(5).toEqual(newSets.length);
    expect(ShareType.PRIVATE).toEqual(newSet.shareType);
  });
});

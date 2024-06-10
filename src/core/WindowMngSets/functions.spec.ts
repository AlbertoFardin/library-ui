import { IMngSet } from "./interfaces";
import {
  updateSetsAfterRemove,
  updateSetsAfterCreate,
  updateSetsAfterModify,
} from "./functions";

const SET_DEFAULT: IMngSet = {
  id: "1",
  payload: {
    label: "label",
    items: [],
  },
  updated: 0,
  created: 0,
  ownerId: "ownerId",
};
const sets: IMngSet[] = [1, 2, 3, 4, 5].map((n) => ({
  ...SET_DEFAULT,
  id: String(n),
}));

describe("WindowMngSets - functions", () => {
  test("updateSetsAfterRemove", () => {
    const set: IMngSet = { ...SET_DEFAULT, id: "3" };
    const newSets = updateSetsAfterRemove(sets, set);
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
});

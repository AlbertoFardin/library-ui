import isEqual from "lodash-es/isEqual";

describe("isEqual", () => {
  const idLabel1 = {
    id: "id1",
    label: "labe1",
  };
  const idLabel2 = {
    id: "id1",
    label: "labe1",
  };
  const idLabel3 = {
    id: "id1",
  };
  const idLabelArr1 = [{ id: "id1", label: "labe1" }];
  const idLabelArr2 = [idLabel1];
  const idLabel4 = {};
  let idLabel5: { id: string; label: string };
  test("value obj", () => {
    expect(isEqual(idLabel1, idLabel2)).toEqual(true);
    expect(isEqual(idLabel1, idLabel3)).toEqual(false);
    expect(isEqual(idLabel1, idLabel4)).toEqual(false);
    expect(isEqual(idLabel1, idLabelArr1)).toEqual(false);
    expect(isEqual(idLabel1, null)).toEqual(false);
    expect(isEqual(idLabel1, idLabel5)).toEqual(false);
    expect(isEqual(null, idLabel5)).toEqual(false);
  });
  test("value array", () => {
    expect(isEqual(idLabelArr1, idLabelArr2)).toEqual(true);
    expect(isEqual(idLabelArr1, null)).toEqual(false);
    expect(isEqual(idLabelArr1, [idLabel1, idLabel2])).toEqual(false);
  });
});

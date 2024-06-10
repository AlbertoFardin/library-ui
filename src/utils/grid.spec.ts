import { getInitialItems, getUpdateItems } from "./grid";

describe("grid utilitis function: getInitialItems", () => {
  test("infiniteScroll true", () => {
    const itemsNew = [
      { id: "4", value: "new" },
      { id: "5", value: "new" },
    ];
    const itemsOld = [
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      { id: "5" },
      { id: "6" },
      { id: "7" },
      { id: "8" },
      { id: "9" },
    ];
    const calculated = getInitialItems({
      infiniteScroll: true,
      itemsNew,
      itemsOld,
      total: itemsOld.length,
    });
    const expected = [
      null,
      null,
      null,
      { id: "4", value: "new" },
      { id: "5", value: "new" },
      null,
      null,
      null,
      null,
    ];

    expect(calculated).toEqual(expected);
  });

  test("infiniteScroll false", () => {
    const itemsNew = [
      { id: "4", value: "new" },
      { id: "5", value: "new" },
    ];
    const itemsOld = [
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      { id: "5" },
      { id: "6" },
      { id: "7" },
      { id: "8" },
      { id: "9" },
    ];
    const calculated = getInitialItems({
      infiniteScroll: false,
      itemsNew,
      itemsOld,
      total: itemsOld.length,
    });
    expect(calculated).toEqual(itemsNew);
  });

  test("infiniteScroll true & itemsOld null", () => {
    const itemsNew = [
      { id: "4", value: "new" },
      { id: "5", value: "new" },
    ];
    const itemsOld = [
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      { id: "5" },
      { id: "6" },
      { id: "7" },
      { id: "8" },
      { id: "9" },
    ];
    const calculated = getInitialItems({
      infiniteScroll: true,
      itemsNew,
      itemsOld: undefined,
      total: itemsOld.length,
    });
    const expected = [
      { id: "4", value: "new" },
      { id: "5", value: "new" },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    expect(calculated).toEqual(expected);
  });
});

describe("grid utilitis function: getUpdateItems", () => {
  test("infiniteScroll true", () => {
    const itemsNew = [{ id: "xxx" }, { id: "yyy" }];
    const itemsOld = [
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      { id: "5" },
      { id: "6" },
      { id: "7" },
      { id: "8" },
      { id: "9" },
    ];
    const calculated = getUpdateItems({
      from: 3,
      itemsNew,
      itemsOld,
      total: itemsOld.length,
    });
    const expected = [
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "xxx" },
      { id: "yyy" },
      { id: "6" },
      { id: "7" },
      { id: "8" },
      { id: "9" },
    ];

    expect(calculated).toEqual(expected);
  });
});

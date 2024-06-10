import { multiselectCtrl, multiselectMeta } from "./multiselect";

const idsTotal = [
  "Ananas",
  "ananas",
  "Apple",
  "apple",
  "Banana",
  "banana",
  "Kiwi",
  "kiwi",
  "Orange",
  "orange",
];

describe("multiselectCtrl", () => {
  test("add item to empty", () => {
    const expected = ["banana"];
    expect(expected).toEqual(multiselectCtrl([], "banana"));
  });

  test("add item to itemsSelected", () => {
    const expected = ["kiwi", "banana"];
    expect(expected).toEqual(multiselectCtrl(["kiwi"], "banana"));
  });

  test("remove item to itemsSelected", () => {
    const expected = ["kiwi"];
    expect(expected).toEqual(multiselectCtrl(["banana", "kiwi"], "banana"));
  });
});

describe("multiselectMeta", () => {
  test("select all, ascendente", () => {
    const expected = idsTotal;
    expect(expected).toEqual(multiselectMeta([], idsTotal, 0, 9));
  });

  test("select all, descendente", () => {
    const expected = idsTotal;
    expect(expected).toEqual(multiselectMeta([], idsTotal, 9, 0));
  });

  test("itemsSelected valorizzato, aggiungo items", () => {
    const expected = ["kiwi", "apple", "ananas", "Apple"];
    expect(expected).toEqual(
      multiselectMeta(["kiwi", "apple"], idsTotal, 1, 3),
    );
  });
});

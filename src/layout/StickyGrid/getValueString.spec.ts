import TypeCell from "./TypeCell";
import getValueString from "./getValueString";

describe("Timezones", () => {
  it("should always be UTC", () => {
    expect(new Date().getTimezoneOffset()).toBe(0);
  });
});

describe("getValueString", () => {
  test("-Bool", () => {
    const t = TypeCell.Bool;
    expect("").toEqual(getValueString(undefined, t));
    expect("").toEqual(getValueString("", t));
    expect("").toEqual(getValueString("_test", t));
    expect("Yes").toEqual(getValueString(true, t));
    expect("No").toEqual(getValueString(false, t));
  });

  test("-String", () => {
    const t = TypeCell.String;
    expect("").toEqual(getValueString(undefined, t));
    expect("").toEqual(getValueString("", t));
    expect("_test").toEqual(getValueString("_test", t));
  });

  test("-MultipleString", () => {
    const t = TypeCell.MultipleString;
    expect("").toEqual(getValueString(undefined, t));
    expect("").toEqual(getValueString("", t));
    expect("t1, t2").toEqual(getValueString(["t1", "t2"], t));
    expect("z, a, c, b").toEqual(getValueString(["z", "a", "c", "b"], t));
    expect("a, b, c, z").toEqual(getValueString("a, b, c, z", t));
  });

  test("-SimpleDate", () => {
    const t = TypeCell.SimpleDate;
    expect("").toEqual(getValueString(undefined, t));
    expect("").toEqual(getValueString("", t));
    expect("31/01/2020").toEqual(getValueString("2020-01-31", t));
    expect("31/01/2020").toEqual(getValueString(1580428800000, t));
  });

  test("-Timestamp", () => {
    const t = TypeCell.Timestamp;
    expect("").toEqual(getValueString(undefined, t));
    expect("").toEqual(getValueString("", t));
    expect("31/01/2020 00:00").toEqual(getValueString("2020-01-31", t));
    expect("31/01/2020 00:00").toEqual(getValueString(1580428800000, t));
  });

  test("-Percentage", () => {
    const t = TypeCell.Percentage;
    expect("").toEqual(getValueString(undefined, t));
    expect("").toEqual(getValueString("", t));
    expect("0%").toEqual(getValueString(0, t));
    expect("40%").toEqual(getValueString(40, t));
    expect("100%").toEqual(getValueString(100, t));
    expect("9999%").toEqual(getValueString(9999, t));
    expect("10.12%").toEqual(getValueString(10.12345, t));
  });

  test("-DictionaryEntries", () => {
    const t = TypeCell.DictionaryEntries;
    expect("").toEqual(getValueString(undefined, t));
    expect("").toEqual(getValueString("", t));
    expect("value1, value2").toEqual(
      getValueString([{ value: "value1" }, { value: "value2" }], t),
    );
    expect("a, b, z").toEqual(
      getValueString([{ value: "z" }, { value: "b" }, { value: "a" }], t),
    );
  });

  test("-Category", () => {
    const t = TypeCell.Category;
    expect("").toEqual(getValueString(undefined, t));
    expect("").toEqual(getValueString("", t));
    expect("M, MShoes, W, WBeauty, WShoes").toEqual(
      getValueString(
        [
          { path: "W", label: "W" },
          { path: "W/Beauty", label: "WBeauty" },
          { path: "M", label: "M" },
          { path: "M/Shoes", label: "MShoes" },
          { path: "W/Shoes", label: "WShoes" },
        ],
        t,
      ),
    );
  });
});

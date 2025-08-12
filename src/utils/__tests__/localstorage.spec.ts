import {
  localstorageGetItem,
  localstorageRemoveItem,
  localstorageSetItem,
} from "../../localstorage";

describe("LocalStorage Utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should set and get a string value", () => {
    localstorageSetItem("stringKey", "hello");
    const result = localstorageGetItem<string>("stringKey");
    expect(result).toBe("hello");
  });

  test("should set and get a boolean value", () => {
    localstorageSetItem("boolKey", true);
    const result = localstorageGetItem<boolean>("boolKey");
    expect(result).toBe(true);
  });

  test("should set and get a record<string, string>", () => {
    const obj = { key1: "value1", key2: "value2" };
    localstorageSetItem("objectKey", obj);
    const result = localstorageGetItem<Record<string, string>>("objectKey");
    expect(result).toEqual(obj);
  });

  test("should return fallback when value is null", () => {
    const fallback = "default";
    const result = localstorageGetItem<string>("missingKey", fallback);
    expect(result).toBe(fallback);
  });

  test("should return undefined when no fallback and key is missing", () => {
    const result = localstorageGetItem<string>("missingKey");
    expect(result).toBeUndefined();
  });

  test("should remove item correctly", () => {
    localstorageSetItem("toRemove", "delete me");
    localstorageRemoveItem("toRemove");
    const result = localstorageGetItem<string>("toRemove");
    expect(result).toBeUndefined();
  });

  test("should handle storing null", () => {
    localstorageSetItem("nullKey", null);
    const result = localstorageGetItem<null>("nullKey");
    expect(result).toBeNull();
  });
});

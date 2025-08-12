import makeJsonPretty from "../makeJsonPretty";

describe("parseJson", () => {
  it("should make pretty a valid JSON string", () => {
    const value = '{"name": "Mario", "age": 30}';
    expect(makeJsonPretty({ value })).toEqual(
      '{\n    "name": "Mario",\n    "age": 30\n}',
    );
  });

  it("should not change an invalid JSON string", () => {
    const value = '{"name": "Mario", "age": 30';
    expect(makeJsonPretty({ value })).toEqual('{"name": "Mario", "age": 30');
  });

  it("should not change an empty string", () => {
    const value = "";
    expect(makeJsonPretty({ value })).toEqual("");
  });

  it("should not change null value", () => {
    const value = null;
    expect(makeJsonPretty({ value })).toEqual(null);
  });
});

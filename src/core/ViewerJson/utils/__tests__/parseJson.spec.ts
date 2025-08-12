import parseJson, { ParseJsonResult } from "../parseJson";

describe("parseJson", () => {
  it("should parse a valid JSON string and return success true with the correct object", () => {
    const jsonString =
      '"\\"{\\\\\\"eu\\\\\\":\\\\\\"19,99\\\\\\",\\\\\\"us\\\\\\":\\\\\\"24,99\\\\\\",\\\\\\"ru\\\\\\":{\\\\\\"full\\\\\\":\\\\\\"499\\\\\\",\\\\\\"discount\\\\\\":\\\\\\"399\\\\\\"}}\\""';
    const result: ParseJsonResult = parseJson(jsonString);
    if (result.success === true) {
      expect(result.jsonObject).toEqual(
        '"{\\"eu\\":\\"19,99\\",\\"us\\":\\"24,99\\",\\"ru\\":{\\"full\\":\\"499\\",\\"discount\\":\\"399\\"}}"',
      );
    } else {
      throw new Error("Parsing should have succeeded, but it failed.");
    }
  });

  it("should parse a valid JSON string and return success true with the correct object", () => {
    const jsonString = '{"name": "Mario", "age": 30}';
    const result: ParseJsonResult = parseJson(jsonString);
    if (result.success === true) {
      expect(result.jsonObject).toEqual({ name: "Mario", age: 30 });
    } else {
      throw new Error("Parsing should have succeeded, but it failed.");
    }
  });

  it("should return success false and an error message for an invalid JSON string", () => {
    const invalidJsonString = '{"name": "Mario", "age": 30'; // Invalid JSON string
    const result: ParseJsonResult = parseJson(invalidJsonString);
    if (result.success === false) {
      expect(result.error).toContain("Unexpected end of JSON input");
    } else {
      throw new Error("Parsing should have failed, but it succeeded.");
    }
  });

  it("should return success true for an empty JSON object", () => {
    const jsonString = "{}";
    const result: ParseJsonResult = parseJson(jsonString);
    if (result.success === true) {
      expect(result.jsonObject).toEqual({});
    } else {
      throw new Error("Parsing should have succeeded, but it failed.");
    }
  });

  it("should handle JSON with arrays correctly", () => {
    const jsonString = '{"numbers": [1, 2, 3, 4], "boolean": true}';
    const result: ParseJsonResult = parseJson(jsonString);

    if (result.success === true) {
      expect(result.jsonObject).toEqual({
        numbers: [1, 2, 3, 4],
        boolean: true,
      });
    } else {
      throw new Error("Parsing should have succeeded, but it failed.");
    }
  });

  it("should handle nested JSON objects correctly", () => {
    const jsonString = '{"person": {"name": "Luigi", "age": 25}}';
    const result: ParseJsonResult = parseJson(jsonString);

    if (result.success === true) {
      expect(result.jsonObject).toEqual({ person: { name: "Luigi", age: 25 } });
    } else {
      throw new Error("Parsing should have succeeded, but it failed.");
    }
  });

  it("should return success false and an error message for a non-JSON string", () => {
    const invalidJsonString = "Just a regular string";
    const result: ParseJsonResult = parseJson(invalidJsonString);
    if (result.success === false) {
      expect(result.error).toContain("Unexpected token");
    } else {
      throw new Error("Parsing should have failed, but it succeeded.");
    }
  });

  it("should return success false for an empty string", () => {
    const emptyString = "";
    const result: ParseJsonResult = parseJson(emptyString);
    if (result.success === false) {
      expect(result.error).toContain("Unexpected end of JSON input");
    } else {
      throw new Error("Parsing should have failed, but it succeeded.");
    }
  });
  it('should return success false for an string containing "true"', () => {
    const trueString = "true";
    const result: ParseJsonResult = parseJson(trueString);
    if (result.success === true) {
      expect(result.jsonObject).toEqual(true);
    } else {
      throw new Error("Parsing should have succeeded, but it failed.");
    }
  });
});

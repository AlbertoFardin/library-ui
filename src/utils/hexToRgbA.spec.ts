import hexToRgbA from "./hexToRgbA";

describe("hex function to Rgb", () => {
  test("test 1.", () => {
    expect(hexToRgbA("#36A9E1", 0.5)).toEqual("rgba(54,169,225,0.5)");
  });
});

import mixColors from "../mixColors";

describe("mixColors", () => {
  it('should return the "from" color when percentage is 0', () => {
    expect(mixColors(0, "#ff6600", "#ffffff")).toBe("#ff6600");
  });

  it("should mix 15% between two hex colors", () => {
    expect(mixColors(0.15, "#fff", "#1A3545")).toBe("#dde1e3");
  });

  it("should mix 25% between two hex colors", () => {
    expect(mixColors(0.25, "#ff6600", "#ffffff")).toBe("#ff8c40");
  });

  it("should mix 25% between two hex colors  (other 1)", () => {
    expect(mixColors(0.25, "#ffffff", "#B19889")).toBe("#ece5e2");
  });

  it("should mix 25% between two hex colors  (other 2 )", () => {
    expect(mixColors(0.25, "#ffffff", "#1a3545")).toBe("#c6cdd1");
  });

  it("should mix 30% between two hex colors", () => {
    expect(mixColors(0.3, "#ffffff", "#dddddd")).toBe("#f5f5f5");
  });

  it("should mix 50% between two hex colors", () => {
    expect(mixColors(0.5, "#ff6600", "#ffffff")).toBe("#ffb380");
  });

  it("should mix 75% between two hex colors", () => {
    expect(mixColors(0.75, "#ff6600", "#ffffff")).toBe("#ffd9bf");
  });

  it("should mix 90% between two hex colors", () => {
    expect(mixColors(0.9, "#F4A902", "#FFFFFF")).toBe("#fef6e6");
  });

  it('should mix 100% between two hex colors return the "to" color', () => {
    expect(mixColors(1, "#ff6600", "#ffffff")).toBe("#ffffff");
  });

  it("should mix correctly even with negative percentage", () => {
    const result = mixColors(-0.5, "#000", "#fff");
    expect(result).toBe("#808080");
  });

  it("should correctly handle shorthand hex colors", () => {
    expect(mixColors(0.5, "#f60", "#fff")).toBe("#ffb380");
  });

  it("should return rgba string if any color has alpha < 1", () => {
    const result = mixColors(
      0.5,
      "rgba(255, 100, 0, 1)",
      "rgba(255, 255, 255, 0)",
    );
    expect(result).toBe("rgba(255,178,128,0.5)");
  });

  it("should preserve alpha channel accurately", () => {
    const result = mixColors(0.5, "rgba(0,0,0,1)", "rgba(255,255,255,0.5)");
    expect(result).toBe("rgba(128,128,128,0.75)");
  });

  it("should return null for invalid percentage", () => {
    expect(mixColors(-1.5, "#000", "#fff")).toBeNull();
    expect(mixColors(1.5, "#000", "#fff")).toBeNull();
  });

  it("should return null for invalid color formats", () => {
    expect(mixColors(0.5, "not-a-color", "#fff")).toBeNull();
    expect(mixColors(0.5, "#fff", "bad-color")).toBeNull(); // prima "#808080ad"
  });
});

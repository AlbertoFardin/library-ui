import { updateQueryParam } from "./updateQueryParam";

describe("updateQueryParam", () => {
  it("should add a parameter if it is absent", () => {
    const url = "https://example.com?name=John";
    const result = updateQueryParam(url, "refresh", "false");
    expect(result).toBe("https://example.com?name=John&refresh=false");
  });

  it("should update the parameter if already present", () => {
    const url = "https://example.com?name=John&refresh=true";
    const result = updateQueryParam(url, "refresh", "false");
    expect(result).toBe("https://example.com?name=John&refresh=false");
  });

  it("should keep other parameters in the URL unchanged", () => {
    const url = "https://example.com?name=John&age=30";
    const result = updateQueryParam(url, "refresh", "false");
    expect(result).toBe("https://example.com?name=John&age=30&refresh=false");
  });

  it("should add the parameter even if there is no query string", () => {
    const url = "https://example.com";
    const result = updateQueryParam(url, "refresh", "false");
    expect(result).toBe("https://example.com?refresh=false");
  });

  it("should update the parameter to a new, different value", () => {
    const url = "https://example.com?name=John&refresh=oldValue";
    const result = updateQueryParam(url, "refresh", "newValue");
    expect(result).toBe("https://example.com?name=John&refresh=newValue");
  });

  it("should add the parameter if the URL is an empty string", () => {
    const url = "";
    const result = updateQueryParam(url, "refresh", "false");
    expect(result).toBe("?refresh=false");
  });

  it("should add the parameter if the URL is undefined", () => {
    const url = null;
    const result = updateQueryParam(url, "refresh", "false");
    expect(result).toBe("?refresh=false");
  });
});

import parseDeepZoomXML from "../parseDeepZoomXML";

describe("parseDeepZoomXML", () => {
  test("should parse XML and extract attributes correctly", () => {
    const responsePayload = {
      content: `<?xml version="1.0"?>
    <Image TileSize="256" Overlap="0" Format="png" xmlns="http://schemas.microsoft.com/deepzoom/2008">
      <Size Width="2000" Height="2344"/>
    </Image>`,
      type: "application/xml",
    };
    const result = parseDeepZoomXML(responsePayload);
    expect(result.tileSize).toBe(256);
    expect(result.overlap).toBe(0);
    expect(result.format).toBe("png");
    expect(result.xmlns).toBe("http://schemas.microsoft.com/deepzoom/2008");
    expect(result.width).toBe(2000);
    expect(result.height).toBe(2344);
  });

  test("should throw an error for invalid XML format", () => {
    const responsePayload = {
      content: `
      <?xml version="1.0"?>
      <InvalidElement />
  `,
      type: "application/xml",
    };
    expect(() => parseDeepZoomXML(responsePayload)).toThrow(
      "Invalid XML format",
    );
  });
});

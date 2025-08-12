import serializeObject from "../serializeObject";
import { KEY_RETRY } from "../useMediaLoader/utils";

export enum RENDITION {
  original = "original",
  image_identify = "identify",
  image_xs = "xs",
  image_s = "s",
  image_l = "l",
  image_xxl = "xxl",
  video_LQ = "LQ",
  video_HQ = "HQ",
}

describe("serializeObject", () => {
  it("cache retry", () => {
    const retry = 10;
    expect(serializeObject({ [KEY_RETRY]: retry })).toBe("try=10");
  });

  it("download", () => {
    const downloadAs = "test.pdf";
    const obj = { downloadAs };
    expect(serializeObject(obj)).toBe("downloadAs=test.pdf");
  });

  it("download full", () => {
    const accessCode = "abc";
    const downloadAs = "test.pdf";
    const redirect = false;
    const rendition = RENDITION.image_identify;
    const obj = { accessCode, rendition, downloadAs, redirect };
    expect(serializeObject(obj)).toBe(
      "accessCode=abc&rendition=identify&downloadAs=test.pdf&redirect=false",
    );
  });
});

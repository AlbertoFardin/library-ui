import getPreviewSrcUrl from "../getPreviewSrcUrl";

const SRC_URL_BASE =
  "https://api-test.wardacloud.com/seecommerce/products/media-content/1655ea8c-8ff0-46c2-9706-b1b22615c480/s";

describe("getPreviewSrcUrl", () => {
  test("no URL", () => {
    const srcUrl = "";
    const loadTime = 2;
    const expected = "";
    expect(expected).toEqual(getPreviewSrcUrl(srcUrl, loadTime));
  });

  test("URL simple", () => {
    const srcUrl = SRC_URL_BASE;
    const loadTime = 2;
    const expected = `${SRC_URL_BASE}?loadTime=${loadTime}`;
    expect(expected).toEqual(getPreviewSrcUrl(srcUrl, loadTime));
  });

  test("URL with an other querystring", () => {
    const srcUrl = `${SRC_URL_BASE}?version=2533&login=1683703862033`;
    const loadTime = 2;
    const expected = `${SRC_URL_BASE}?version=2533&login=1683703862033&loadTime=${loadTime}`;
    expect(expected).toEqual(getPreviewSrcUrl(srcUrl, loadTime));
  });
});

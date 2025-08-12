import getMimeType from "./getMimeType";

describe("MultiUploads - getMimeType", () => {
  test("caso con estensione esistente", () => {
    const nameFile = "file.ciccio_bello.jpg";
    expect(getMimeType(nameFile)).toEqual("image/jpeg");
  });
  test("caso con estensione NON esistente", () => {
    const nameFile = "file.ciccio_bello.jpg432";
    expect(getMimeType(nameFile)).toEqual("application/octet-stream");
  });
  test("caso senza estensione", () => {
    const nameFile = "file";
    expect(getMimeType(nameFile)).toEqual("application/octet-stream");
  });
  test("caso con estensione maiuscolo", () => {
    const nameFile = "file.ciccio_bello.jpg";
    expect(getMimeType(nameFile)).toEqual("image/jpeg");
  });
});

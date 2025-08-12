import * as selectionJson from "../../../../static-medias/icomoon/selection.json";

// Classe di test con Jest
describe("Icon ligatures validation", () => {
  test("All icons should have ligatures equal to their names", () => {
    selectionJson.icons.forEach((el) => {
      const properties = el.properties;
      if (
        properties.ligatures == null ||
        properties.ligatures != properties.name
      )
        console.log(JSON.stringify(properties));
      expect(properties.ligatures).toBeDefined();
      expect(properties.ligatures).toBe(properties.name);
    });
  });
});

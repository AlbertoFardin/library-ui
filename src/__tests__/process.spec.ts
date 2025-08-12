describe("NodeJS", () => {
  it("nodeJS versione check", () => {
    console.log("Node.js version:", process.version);
    expect(process.version).toEqual("v17.9.1");
  });
});

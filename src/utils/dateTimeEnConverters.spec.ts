import { enDateTimeFormat, enTimeAgoFormat } from "./dateTimeEnConverters";

describe("enTimeAgoFormat", () => {
  it("should return 'just now' for a recent date", () => {
    const recentDate = new Date().toISOString();
    expect(enTimeAgoFormat(recentDate)).toBe("just now");
  });

  it("should return '1 day ago' for a date 1 day in the past", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    expect(enTimeAgoFormat(pastDate.toISOString())).toBe("1 day ago");
  });

  it("should handle dates far in the past", () => {
    const oldDate = "2000-01-01T00:00:00.000Z";
    const result = enTimeAgoFormat(oldDate);
    expect(result).toMatch(/years? ago/);
  });
});

describe("enDateTimeFormat", () => {
  it("should format date in 'DD/MM/YY - HH:mm' format", () => {
    const testDate = "2024-11-04T08:56:42.787Z";
    expect(enDateTimeFormat(testDate)).toBe("04/11/24 - 08:56");
  });

  it("should handle a different date correctly", () => {
    const anotherDate = "2022-07-20T14:30:00.000Z";
    expect(enDateTimeFormat(anotherDate)).toBe("20/07/22 - 14:30");
  });
});

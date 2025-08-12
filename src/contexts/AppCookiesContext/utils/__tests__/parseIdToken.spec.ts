import parseIdToken from "../parseIdToken";

describe("parseIdToken", () => {
  // A valid JWT token example (
  const validToken =
    "eyJraWQiOiJoTGVacDFZNE9FZXhqTG9vWGhYM1hJSExyU0poSW1GbnpVTzVlQkFYQmhvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMGU0MTljYi0xZTMzLTQ4MzItYTQ2Zi1mZmExNmM3NDA3NDciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZ3JvdXBJZCI6IkRFTU8iLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9Gc2VQY294dlgiLCJjb2duaXRvOnVzZXJuYW1lIjoic2ltbWFjby5tYXJhbmRpbm8iLCJ1c2VySWQiOiJlMGU0MTljYi0xZTMzLTQ4MzItYTQ2Zi1mZmExNmM3NDA3NDciLCJwaWN0dXJlIjoiaHR0cHM6XC9cL2FwaS1kZXYud2FyZGFjbG91ZC5jb21cL21jclwvbWVkaWEtY29udGVudFwvZTYxOTE5M2YtNTM5Ni00MTk3LWI5ZDUtOTZhMTUwMWRjODgxXC9zPyIsIm9yaWdpbl9qdGkiOiI1YjAzYmM4OC1lZDY3LTQ2MTEtYTEzYi0yZGM2ZjIwZmFkNmQiLCJhdWQiOiJjYmUwZDQyczk3bWZpbnQ5NGdqOHRoZTB1IiwiZXZlbnRfaWQiOiJmMzExZjY4OS1kMjY2LTQwNzItOGJlNi01MWE3NzU2ZGEwNDEiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyOTY5NTkzMywidGVuYW50SWQiOiJERU1PIiwiaXNXYXJkYSI6InRydWUiLCJuYW1lIjoiU2ltbWFjbyIsImV4cCI6MTcyOTY5OTUzMywiaWF0IjoxNzI5Njk1OTMzLCJmYW1pbHlfbmFtZSI6Ik1hcmFuZGlubyIsImp0aSI6ImU1MTMyZWM5LTM2Y2YtNGJhOC05ZDIwLTg3MmRmMTBkY2I2ZiIsImVtYWlsIjoic2ltbWFjby5tYXJhbmRpbm9Ad2FyZGEuaXQifQ.glJWsBIrhJKvQntUNe3-_79Tw5lCeouZJ6ZKK-zbGp66sU5QgnWup8SE2KgCsv6ZMZziYXqkNOqtA6SBdyQDOnrrVve3aXH4R_WnmSgQSAfVCIY1LaRoCPYCqJ6MbXEu4-puuQdfPbwLHsC5Z17QGMO64hSHdk4A9eVEkUWDXuAGn1wmZdoe4kwoY2_aYao23BB9pYRUv0LcKjubSGgNDAwS8eAyiMVS181vwjfPtIc4NVTyn0WP438BdrqZN1BllKNCcRgM1Cv6LDq3mncypbUZCoazzHKNTUCe1E2dfpPDX1QqtRiSfAJF--e8bK3jQG9ouxXCTZNfueiCGyYHBQ";
  /* corrisponde a:
{
  "sub": "e0e419cb-1e33-4832-a46f-ffa16c740747",
  "email_verified": true,
  "groupId": "DEMO",
  "iss": "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_FsePcoxvX",
  "cognito:username": "simmaco.marandino",
  "userId": "e0e419cb-1e33-4832-a46f-ffa16c740747",
  "picture": "https://api-dev.wardacloud.com/mcr/media-content/e619193f-5396-4197-b9d5-96a1501dc881/s?",
  "origin_jti": "5b03bc88-ed67-4611-a13b-2dc6f20fad6d",
  "aud": "cbe0d42s97mfint94gj8the0u",
  "event_id": "f311f689-d266-4072-8be6-51a7756da041",
  "token_use": "id",
  "auth_time": 1729695933,
  "tenantId": "DEMO",
  "isWarda": "true",
  "name": "Simmaco",
  "exp": 1729699533,
  "iat": 1729695933,
  "family_name": "Marandino",
  "jti": "e5132ec9-36cf-4ba8-9d20-872df10dcb6f",
  "email": "simmaco.marandino@warda.it"
}
*/
  it("should decode a valid JWT token", () => {
    const payload = parseIdToken(validToken);
    expect(payload).toBeDefined();
    expect(payload.userId).toBe("e0e419cb-1e33-4832-a46f-ffa16c740747");
    expect(payload.groupId).toBe("DEMO");
    expect(payload.tenantId).toBe("DEMO");
    expect(payload.email).toBe("simmaco.marandino@warda.it");
  });

  it("should return null for an invalid token format", () => {
    const invalidToken = "invalid.token.format";
    const payload = parseIdToken(invalidToken);
    expect(payload).toBeNull();
  });

  it("should return null for a token with fewer than three parts", () => {
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    const payload = parseIdToken(invalidToken);
    expect(payload).toBeNull();
  });

  it("should return null for a malformed base64 string", () => {
    const invalidToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalidBase64Part.abc123";
    const payload = parseIdToken(invalidToken);
    expect(payload).toBeNull();
  });

  it("should handle errors gracefully", () => {
    // Test with a null token
    const payload = parseIdToken(null as string);
    expect(payload).toBeNull();
  });

  it("should return null for an empty token", () => {
    const payload = parseIdToken("");
    expect(payload).toBeNull();
  });
});

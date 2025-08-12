import { IIdTokenPayload } from "../interfaces";

const parseIdToken = (token: string): IIdTokenPayload | null => {
  if (token == null) {
    return null;
  }
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token: it must contain three parts.");
    }
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    // console.error("Error while parsing the JWT token:", error);
    return null;
  }
};

export default parseIdToken;

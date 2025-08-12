export interface IIdTokenPayload {
  // "sub": "e0e419cb-1e33-4832-a46f-ffa16c740747",
  // "email_verified": true,
  groupId: string; // "groupId": "DEMO",
  // "iss": "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_FsePcoxvX",
  // "cognito:username": "simmaco.marandino",
  userId: string; //"userId": "e0e419cb-1e33-4832-a46f-ffa16c740747",
  // "picture": "https://api-dev.wardacloud.com/mcr/media-content/e619193f-5396-4197-b9d5-96a1501dc881/s?",
  // "origin_jti": "5b03bc88-ed67-4611-a13b-2dc6f20fad6d",
  // "aud": "cbe0d42s97mfint94gj8the0u",
  // "event_id": "f311f689-d266-4072-8be6-51a7756da041",
  // "token_use": "id",
  // "auth_time": 1729695933,
  tenantId: string; // "tenantId": "DEMO",
  // "isWarda": "true",
  // "name": "Simmaco",
  exp: number; // "exp": 1729699533,
  // "iat": 1729695933,
  // "family_name": "Marandino",
  // "jti": "e5132ec9-36cf-4ba8-9d20-872df10dcb6f",
  email: string; // "email": "simmaco.marandino@warda.it"
  portalId: string;
}

export interface ICookiesInfo {
  idToken: string;
  refreshToken?: string; // viene restituita la stringa vuota "" quando viene richiesto il token usando il refresh token
  expiresIn: number; // 3600 (second)
  tokenType: string; // "Bearer"
  refreshTokenExpiresIn?: number; // 432000 (second)
}

export type SignUrl = (url: string) => Promise<string>;

export interface IAuthCookiesHelper {
  getIdToken: () => string;
  getIdTokenPayload: () => IIdTokenPayload;
  getRefreshToken: () => string;
  getAuthorization: () => string;
  shouldIdTokenBeRefreshed: (tokenRefreshThreshold?: number) => boolean;
  isRefreshTokenPresent: () => boolean;
  isFullyLogged: () => boolean;
  setCookies: (authResponse: ICookiesInfo) => void;
  removeAllCookies: () => void;
  isApiGatewayAccessWithAuthorizationHeader: () => boolean;
  signUrl: SignUrl;
}

export interface IAppCookiesContext {
  getAuthCookiesHelper: () => IAuthCookiesHelper;
}

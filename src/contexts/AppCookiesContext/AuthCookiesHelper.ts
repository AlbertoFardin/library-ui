import Cookies from "js-cookie";
import { IAuthCookiesHelper, ICookiesInfo } from "./interfaces";
import parseIdToken from "./utils/parseIdToken";
import logIf from "../../utils/logIf";
import getSignedUrl from "./utils/getSignedUrl";

export const AuthCookiesHelper = ({
  authName,
  refreshName,
  apiGatewayAccessWithAuthorizationHeader = false,
}: {
  authName: string;
  refreshName: string;
  apiGatewayAccessWithAuthorizationHeader?: boolean;
}): IAuthCookiesHelper => {
  const authOption: Cookies.CookieAttributes =
    apiGatewayAccessWithAuthorizationHeader
      ? { sameSite: "strict" }
      : {
          domain: window.location.hostname.split(".").slice(1).join("."),
          sameSite: "Lax",
        };
  const getIdToken = () => Cookies.get(authName) || undefined;
  const getIdTokenPayload = () => parseIdToken(getIdToken());
  const getRefreshToken = () => Cookies.get(refreshName) || undefined;
  const getAuthorization = () => `Bearer ${Cookies.get(authName)}`;
  const shouldIdTokenBeRefreshed = (
    tokenRefreshThreshold?: number,
  ): boolean => {
    const checkIdToken = () => {
      if (!tokenRefreshThreshold) return !Cookies.get(authName);
      const idTokenPayload = getIdTokenPayload();
      return (
        !idTokenPayload ||
        Date.now() + tokenRefreshThreshold > idTokenPayload.exp * 1000
      );
    };
    return !!Cookies.get(refreshName) && checkIdToken();
  };
  const isFullyLogged = (): boolean => {
    return !!Cookies.get(refreshName) && !!Cookies.get(authName);
  };
  const isRefreshTokenPresent = (): boolean => {
    return !!Cookies.get(refreshName);
  };
  const setCookies = (authResponse: ICookiesInfo) => {
    setCookie(
      authName,
      authResponse.idToken,
      authResponse.expiresIn,
      authOption,
    );
    if (!!authResponse.refreshToken) {
      const refreshTokenExpiresIn =
        authResponse.refreshTokenExpiresIn || 12 * 60 * 60;
      setCookie(refreshName, authResponse.refreshToken, refreshTokenExpiresIn, {
        sameSite: "strict",
      });
    }
  };
  const removeAllCookies = () => {
    removeCookie(refreshName);
    removeCookie(authName);
  };

  const setCookie = (
    name: string,
    value: string,
    expiresIn: number,
    options?: Cookies.CookieAttributes,
  ): void => {
    Cookies.set(name, value, {
      ...options,
      expires: expiresIn / (24 * 60 * 60),
      secure: true,
    });
    logIf(
      false,
      () =>
        `set cookie "${name}" for domain "${
          options?.domain
        }" with value "${Cookies.get(name)}" `,
    );
  };
  const removeCookie = (name: string): void => {
    Cookies.remove(name, {
      secure: true,
    });
  };

  const signUrl = (url: string) =>
    getSignedUrl(
      url,
      getAuthorization(),
      apiGatewayAccessWithAuthorizationHeader,
    );

  const isApiGatewayAccessWithAuthorizationHeader = () =>
    apiGatewayAccessWithAuthorizationHeader;

  return {
    getIdToken,
    getRefreshToken,
    getAuthorization,
    getIdTokenPayload,
    isFullyLogged,
    shouldIdTokenBeRefreshed,
    isRefreshTokenPresent,
    setCookies,
    removeAllCookies,
    isApiGatewayAccessWithAuthorizationHeader,
    signUrl,
  };
};

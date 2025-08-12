import { AuthCookiesHelper } from "./AuthCookiesHelper";

const getAuthCookiesHelper = (apiGatewayAccessWithAuthorizationHeader = true) =>
  AuthCookiesHelper({
    authName: apiGatewayAccessWithAuthorizationHeader
      ? "wardaAuthorization"
      : "warda-authorization", // OLD
    refreshName: apiGatewayAccessWithAuthorizationHeader
      ? "wardaRefreshToken"
      : "warda-refreshToken", // OLD
    apiGatewayAccessWithAuthorizationHeader,
  });

export default getAuthCookiesHelper;

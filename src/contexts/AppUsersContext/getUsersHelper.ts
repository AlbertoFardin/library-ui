import { getAuthCookiesHelper } from "../AppCookiesContext";
import { seecommerceUsersApiUrls, portalUsersApiUrls } from "./constants";
import { IUsersHelper } from "./interfaces";

export const getPortalUsersHelper = ({
  baseUrl,
  groupId,
  tenantId,
  portalId,
}: {
  baseUrl: string;
  groupId: string;
  tenantId: string;
  portalId: string;
}): IUsersHelper => ({
  usersApiUrls: portalUsersApiUrls,
  authCookiesHelper: getAuthCookiesHelper(),
  baseUrl,
  groupId,
  tenantId,
  portalId,
});

export const getSeecommerceUsersHelper = (
  baseUrl: string,
  apiGatewayAccessWithAuthorizationHeader: boolean,
): IUsersHelper => ({
  productId: "seecommerce",
  usersApiUrls: seecommerceUsersApiUrls,
  authCookiesHelper: getAuthCookiesHelper(
    apiGatewayAccessWithAuthorizationHeader,
  ),
  baseUrl,
});

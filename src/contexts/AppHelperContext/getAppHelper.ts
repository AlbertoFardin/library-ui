import {
  getPortalUsersHelper,
  getSeecommerceUsersHelper,
} from "../AppUsersContext";
import { portalWebSocketUrls } from "../AppWebSocketContext/constants";
import { IAppHelper } from "./interfaces";
import { seecommerceWebSocketUrls } from "../AppWebSocketContext";

export const getSeecommerceAppHelper = (
  baseUrl: string,
  apiGatewayAccessWithAuthorizationHeader = true,
): IAppHelper => ({
  ...getSeecommerceUsersHelper(
    baseUrl,
    apiGatewayAccessWithAuthorizationHeader,
  ),
  webSocketUrls: seecommerceWebSocketUrls,
});

export const getPortalAppHelper = ({
  baseUrl,
  groupId,
  tenantId,
  portalId,
}: {
  baseUrl: string;
  groupId: string;
  tenantId: string;
  portalId: string;
}): IAppHelper => ({
  ...getPortalUsersHelper({ baseUrl, groupId, tenantId, portalId }),
  webSocketUrls: portalWebSocketUrls,
});

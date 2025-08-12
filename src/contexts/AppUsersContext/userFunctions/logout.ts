import { ApiGWCaller } from "../../ApiGWCaller";
import { IUsersHelper } from "../interfaces";

interface ISeecommerceLogoutRequest {
  applicationId?: string;
  groupId?: string;
  portalId?: string;
  tenantId?: string;
  refreshToken: string;
}
interface IPortalLogoutRequest {
  authorization: string;
  refreshToken: string;
}
type LogoutRequest = ISeecommerceLogoutRequest | IPortalLogoutRequest;

const logout = async ({
  usersHelper,
  onSuccess,
  onFailure,
}: {
  usersHelper: IUsersHelper;
  onSuccess: () => void;
  onFailure: () => void;
}): Promise<void> => {
  try {
    // ATTENZIONE data e authorization sono diversi per Seecommerce e Portal
    const data: LogoutRequest = {
      applicationId: usersHelper.productId,
      groupId:
        usersHelper.groupId ||
        usersHelper.authCookiesHelper.getIdTokenPayload()?.groupId,
      portalId:
        usersHelper.portalId ||
        usersHelper.authCookiesHelper.getIdTokenPayload()?.portalId,
      tenantId:
        usersHelper.tenantId ||
        usersHelper.authCookiesHelper.getIdTokenPayload()?.tenantId,
      refreshToken: usersHelper.authCookiesHelper.getRefreshToken(),
    };
    await ApiGWCaller({ baseUrl: usersHelper.baseUrl }).doCall<
      LogoutRequest,
      null
    >({
      ...usersHelper.usersApiUrls.doLogout,
      data,
      withCredentials: false,
      authorization: usersHelper.authCookiesHelper.getAuthorization(),
    });
    usersHelper.authCookiesHelper.removeAllCookies();
    if (onSuccess) onSuccess();
  } catch (error) {
    console.error("Logout call failed (I remove cookies anyway):", error);
    usersHelper.authCookiesHelper.removeAllCookies();
    if (onFailure) onFailure();
  }
};

export default logout;

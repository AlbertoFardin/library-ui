import { ApiGWCaller } from "../../ApiGWCaller";
import { ICookiesInfo } from "../../AppCookiesContext";
import { IUsersHelper } from "../interfaces";

interface IRefreshRequest {
  refreshToken: string;
  applicationId: string; //"seecommerce"
  userId: string; // "b4ec7bb0-6b5f-4377-a8dc-e1c610d16fee"
  groupId: string; // "DEMO"
  tenantId: string; // "DEMO"
  portalId?: string;
}

// NOTE questa funzione ad oggi non viene usata ne in SC ne in portal
// da valutare in un task di DEBITO TECNICO se buttarla o centrallizzarla
// SEECOMM-8129
const refresh = async ({
  usersHelper,
  userId,
  groupId,
  tenantId,
  portalId,
}: {
  usersHelper: IUsersHelper;
  userId: string;
  groupId?: string;
  tenantId?: string;
  portalId?: string;
}): Promise<void> => {
  try {
    const authCookiesHelper = usersHelper.authCookiesHelper;
    const idTokenPayload = authCookiesHelper.getIdTokenPayload();
    const data: IRefreshRequest = {
      refreshToken: usersHelper.authCookiesHelper.getRefreshToken(),
      applicationId: usersHelper.productId,
      userId: userId || idTokenPayload.userId,
      groupId: groupId || usersHelper.groupId,
      tenantId: tenantId || usersHelper.tenantId,
      portalId: portalId || usersHelper.portalId,
    };
    const authResponse = await ApiGWCaller({
      baseUrl: usersHelper.baseUrl,
    }).doCall<IRefreshRequest, ICookiesInfo>({
      ...usersHelper.usersApiUrls.doRefresh,
      data,
      withCredentials: false,
    });
    authCookiesHelper.setCookies(authResponse);
  } catch (error) {
    console.error("Refreshing token failed:", error);
    throw error;
  }
};

export default refresh;

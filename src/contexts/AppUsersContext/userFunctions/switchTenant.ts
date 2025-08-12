import { ApiGWCaller } from "../../ApiGWCaller";
import { ICookiesInfo } from "../../AppCookiesContext/interfaces";
import { IUsersHelper } from "../interfaces";

interface ISwitchTenantRequest {
  applicationId: string;
  tenantId: string;
  refreshToken: string;
}

const switchTenant = async ({
  usersHelper,
  tenantId,
  onSuccess,
}: {
  usersHelper: IUsersHelper;
  tenantId: string;
  onSuccess?: () => void;
}): Promise<void> => {
  try {
    const data: ISwitchTenantRequest = {
      refreshToken: usersHelper.authCookiesHelper.getRefreshToken(),
      applicationId: usersHelper.productId,
      tenantId,
    };

    const authProps =
      usersHelper.authCookiesHelper.isApiGatewayAccessWithAuthorizationHeader()
        ? {
            withCredentials: false,
            authorization: usersHelper.authCookiesHelper.getAuthorization(),
          }
        : {
            withCredentials: true,
            authorization: null,
          };
    const authResponse = await ApiGWCaller({
      baseUrl: usersHelper.baseUrl,
    }).doCall<ISwitchTenantRequest, ICookiesInfo>({
      ...usersHelper.usersApiUrls.doSwitchTenant,
      data,
      ...authProps,
    });
    usersHelper.authCookiesHelper.setCookies(authResponse);
    if (onSuccess) onSuccess();
  } catch (error) {
    console.error("Switch tenant failed:", error);
  }
};

export default switchTenant;

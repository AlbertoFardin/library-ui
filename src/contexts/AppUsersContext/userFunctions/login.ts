import { IResLogin } from "../../../layout/Login";
import { ApiGWCaller } from "../../ApiGWCaller";
import { ICookiesInfo } from "../../AppCookiesContext";
import { IUsersHelper } from "../interfaces";

interface ILoginRequest {
  email: string;
  password: string;
  groupId?: string;
  tenantId?: string;
  portalId?: string;
  applicationId?: string;
}

const login = async ({
  usersHelper,
  username,
  password,
  groupId,
  tenantId,
  portalId,
  onSuccess,
}: {
  usersHelper: IUsersHelper;
  username: string;
  password: string;
  groupId?: string;
  tenantId?: string;
  portalId?: string;
  onSuccess?: () => void;
}): Promise<IResLogin> => {
  try {
    const data: ILoginRequest = {
      email: username,
      password,
      applicationId: usersHelper.productId,
      tenantId: tenantId || usersHelper.tenantId,
      portalId: portalId || usersHelper.portalId,
      groupId: groupId || usersHelper.groupId,
    };
    const authResponse = await ApiGWCaller({
      baseUrl: usersHelper.baseUrl,
    }).doCall<ILoginRequest, ICookiesInfo>({
      ...usersHelper.usersApiUrls.doLogin,
      data,
      withCredentials: false,
    });
    usersHelper.authCookiesHelper.setCookies(authResponse);
    if (onSuccess) {
      onSuccess();
    }
    console.log("[login]");
    return {
      success: true,
      message: null,
    };
  } catch (error) {
    console.error("Login failed", error);
    return {
      success: false,
      message: error.error,
    };
  }
};

export default login;

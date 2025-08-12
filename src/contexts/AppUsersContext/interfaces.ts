import { IResLogin } from "../../layout/Login";
import { IAuthCookiesHelper } from "../AppCookiesContext";

// URLs per API GATEWAY for users functions
export interface IUsersApiUrls {
  doLogin: { url: string; method: string };
  doRefresh: { url: string; method: string };
  doLogout: { url: string; method: string };
  doSwitchTenant: { url: string; method: string };
}

export interface IUsersHelper {
  productId?: string;
  usersApiUrls: IUsersApiUrls;
  authCookiesHelper: IAuthCookiesHelper;
  baseUrl: string;
  groupId?: string;
  tenantId?: string;
  portalId?: string;
}

export interface IAppUsersContext {
  usersHelper: IUsersHelper;
  login: ({
    username,
    password,
    tenantId,
    onSuccess,
  }: {
    username: string;
    password: string;
    tenantId?: string;
    onSuccess?: () => void;
  }) => Promise<IResLogin>;
  logout: ({
    onSuccess,
    onFailure,
  }: {
    onSuccess?: () => void;
    onFailure?: () => void;
  }) => Promise<void>;
  refresh: ({
    userId,
    groupId,
    tenantId,
  }: {
    userId: string;
    groupId: string;
    tenantId: string;
  }) => Promise<void>;
  switchTenant: ({
    tenantId,
    onSuccess,
  }: {
    tenantId: string;
    onSuccess?: () => void;
  }) => Promise<void>;
}

export interface IRequestTokenResponse {
  status: number;
  statusText: string;
  response: unknown;
}

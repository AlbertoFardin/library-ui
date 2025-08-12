import { IUsersApiUrls } from "./interfaces";

export const seecommerceUsersApiUrls: IUsersApiUrls = {
  doLogin: {
    url: "/users/token/user",
    method: "post",
  },
  doRefresh: {
    url: "/users/token/refresh",
    method: "post",
  },
  doLogout: {
    url: "/users/token/user/logout",
    method: "post",
  },
  doSwitchTenant: {
    url: "/users/user/tenant/switch",
    method: "post",
  },
};

export const portalUsersApiUrls: IUsersApiUrls = {
  doLogin: {
    url: "/portals/user/login",
    method: "post",
  },
  doRefresh: {
    url: "/portals/user/refresh-token",
    method: "post",
  },
  doLogout: {
    url: "/portals/user/logout",
    method: "post",
  },
  doSwitchTenant: {
    url: null, // not used in portal
    method: "post",
  },
};

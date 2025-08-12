import { IWebSocketUrls } from "../AppWebSocketContext/interfaces";
import { IUsersHelper } from "../AppUsersContext/interfaces";

export interface ICacheBustContext {
  regenerateCacheBust: () => string;
  getCacheBust: () => string;
}
export interface IAppHelperContext extends ICacheBustContext {
  getAppHelper: () => IAppHelper;
}

export interface IAppHelper extends IUsersHelper {
  webSocketUrls: IWebSocketUrls;
}

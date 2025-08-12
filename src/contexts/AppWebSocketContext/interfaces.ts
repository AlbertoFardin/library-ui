import { Service } from "../../interfaces";

// URLs per WEB SOCKET
export interface IWebSocketUrls {
  socketUrl: ({
    productId,
    idToken,
  }: {
    productId: string;
    idToken: string;
  }) => string;
  anonymousSocketUrl: ({
    productId,
    tenantId,
  }: {
    productId: string;
    tenantId: string;
  }) => string;
}

export type OpenWebsocketType =
  | {
      anonymous: true;
      tenantId: string;
    }
  | {
      anonymous: false;
    };

export interface IWsCallback {
  id: string;
  callback;
  dispatch: React.Dispatch<unknown>;
}

export type TNotificationType = string;
export type TConnectionId = string;

export interface IWsNotification<TPayload> {
  service: Service;
  application: string;
  tenantId: string;
  user: string;
  notificationType: TNotificationType;
  payload: TPayload;
  connetionUUID?: string;
  isError: boolean;
}

export interface IWsCallbackViewport<TPaylod, TDispatch> {
  id: string;
  callback: (
    itemsWs: IWsNotification<TPaylod>[],
    dispatch: React.Dispatch<TDispatch>,
  ) => void;
}

export interface IAppWebSocketContext {
  openWebSocket: (props: OpenWebsocketType) => void;
  closeWebSocket: () => void;
  registerWebSocketCallback: (callback: IWsCallback) => boolean;
  unregisterWebSocketCallback: (callbackId: string) => boolean;
  getWebSocketConnectionId: () => TConnectionId | null;
  isConnected: () => boolean;
}

import * as React from "react";
import { IAuthCookiesHelper } from "../AppCookiesContext";
import logIf from "../../utils/logIf";
import {
  IAppWebSocketContext,
  IWebSocketUrls,
  IWsCallback,
  OpenWebsocketType,
} from "./interfaces";

const AppWebSocketContext = React.createContext<
  IAppWebSocketContext | undefined
>(undefined);

export const useAppWebSocketCtx = (throwOnError: boolean = true) => {
  const context = React.useContext(AppWebSocketContext);
  if (throwOnError && context === undefined) {
    throw new Error(
      "useAppWebSocketCtx must be used within a AppWebSocketProvider",
    );
  }
  return context;
};

export interface IAppWebSocketProvider {
  children: React.ReactNode;
  productId: string;
  webSocketUrls: IWebSocketUrls;
  authCookiesHelper: IAuthCookiesHelper;
  baseUrl: string;
  extraLogEnabled?: boolean;
}

export const AppWebSocketProvider: React.FC<IAppWebSocketProvider> = ({
  children,
  productId,
  webSocketUrls,
  authCookiesHelper,
  baseUrl,
  extraLogEnabled = false,
}) => {
  const webSocketRef = React.useRef<WebSocket | null>(null);
  const connectionIdRef = React.useRef<string | null>(null);
  const registeredCallbacksRef = React.useRef<IWsCallback[]>([]);

  const openWebSocket = React.useCallback(
    (props: OpenWebsocketType) => {
      let ws = webSocketRef.current;
      if (
        ws &&
        ws.readyState === WebSocket.OPEN &&
        (!connectionIdRef.current ||
          (!props.anonymous && !authCookiesHelper.isRefreshTokenPresent()))
      ) {
        ws.close();
        return;
      }
      const wsClosed = !ws || ws.readyState === WebSocket.CLOSED;
      if (wsClosed && (props.anonymous || authCookiesHelper.isFullyLogged())) {
        const routeWithParameter = props.anonymous
          ? webSocketUrls.anonymousSocketUrl({
              productId: productId,
              tenantId: props.tenantId,
            })
          : webSocketUrls.socketUrl({
              productId: productId,
              idToken: authCookiesHelper.getIdToken(),
            });
        const url = `${baseUrl}${routeWithParameter}`;
        logIf(extraLogEnabled, () => `Opening websocket with ${url}...`);
        ws = new WebSocket(url);
        logIf(extraLogEnabled, () => `Websocket created`);
        ws.onmessage = (e) => {
          if (e.data) {
            const data = JSON.parse(e.data);
            logIf(
              extraLogEnabled,
              () => `received from websocket ${JSON.stringify(data)}`,
            );
            if (data.connectionUUID !== undefined) {
              connectionIdRef.current = data.connectionUUID;
            }
            if (!data.connectionUUID && !connectionIdRef.current) {
              logIf(
                extraLogEnabled,
                () => `sending to websocket "GetConnectionUUID"`,
              );
              ws.send("GetConnectionUUID");
            }
            if (Array.isArray(data)) {
              registeredCallbacksRef.current.forEach((x) =>
                x.callback(data, x.dispatch),
              );
            }
          }
        };

        ws.onopen = () => {
          console.log("[websocket] ✅ opened");
        };

        ws.onclose = () => {
          webSocketRef.current = null;
          console.log("[websocket] ❌ closed");
          if (props.anonymous || authCookiesHelper.isFullyLogged()) {
            logIf(extraLogEnabled, () =>
              props.anonymous
                ? "[websocket] Try to reopen ..."
                : `[websocket] Try to reopen when idToken is "${authCookiesHelper.getIdToken()}"`,
            );
            openWebSocket(props);
          }
        };
        webSocketRef.current = ws;
      }
    },
    [
      baseUrl,
      webSocketUrls,
      authCookiesHelper,
      productId,
      extraLogEnabled,
      webSocketRef,
      connectionIdRef,
    ],
  );

  const closeWebSocket = React.useCallback(() => {
    if (webSocketRef.current) {
      webSocketRef.current.close();
      logIf(
        extraLogEnabled &&
          webSocketRef.current?.readyState === WebSocket.CLOSING,
        () => "[websocket] ❌ closing",
      );
      webSocketRef.current = null;
    }
  }, [extraLogEnabled, webSocketRef]);

  const registerWebSocketCallback = React.useCallback(
    (callback: IWsCallback): boolean => {
      logIf(extraLogEnabled, () => `registerCallback - ${callback.id}`);
      const exists = registeredCallbacksRef.current.some(
        (cb) => cb.id === callback.id,
      );
      if (exists) {
        logIf(
          extraLogEnabled,
          () => `registerCallback ${callback.id}: callback id already present`,
        );
        return false;
      } else {
        registeredCallbacksRef.current.push(callback);
        logIf(
          extraLogEnabled,
          () => `registerCallback ${callback.id}: registered`,
        );
        return true;
      }
    },
    [extraLogEnabled],
  );

  const unregisterWebSocketCallback = React.useCallback(
    (callbackId: string): boolean => {
      logIf(extraLogEnabled, () => `unregisterCallback - ${callbackId}`);
      const index = registeredCallbacksRef.current.findIndex(
        (x) => x.id === callbackId,
      );
      if (index === -1) {
        logIf(
          extraLogEnabled,
          () => `unregisterCallback ${callbackId}: callback id not found`,
        );
        return false;
      } else {
        registeredCallbacksRef.current.splice(index, 1);
        logIf(
          extraLogEnabled,
          () => `unregisterCallback ${callbackId}: unregistered`,
        );
        return true;
      }
    },
    [extraLogEnabled],
  );

  const getWebSocketConnectionId = React.useCallback(
    () => connectionIdRef.current,
    [connectionIdRef],
  );

  const isConnected = React.useCallback(
    () => webSocketRef.current?.readyState === WebSocket.OPEN,
    [webSocketRef],
  );

  const value = React.useMemo(
    (): IAppWebSocketContext => ({
      openWebSocket,
      closeWebSocket,
      registerWebSocketCallback,
      unregisterWebSocketCallback,
      getWebSocketConnectionId,
      isConnected,
    }),
    [
      openWebSocket,
      closeWebSocket,
      registerWebSocketCallback,
      unregisterWebSocketCallback,
      getWebSocketConnectionId,
      isConnected,
    ],
  );
  return <AppWebSocketContext.Provider value={value} children={children} />;
};

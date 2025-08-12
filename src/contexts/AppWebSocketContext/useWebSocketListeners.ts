import * as React from "react";
import { useAppWebSocketCtx } from "./AppWebSocketContext";
import logIf from "../../utils/logIf";

export const useWebSocketListeners = (
  webSocketCallbacks,
  dispatch,
  extraLogEnabled = false,
) => {
  const appWebSocketCtx = useAppWebSocketCtx();
  React.useEffect(() => {
    webSocketCallbacks.forEach((x) => {
      const outcome = appWebSocketCtx.registerWebSocketCallback({
        id: x.id,
        callback: x.callback,
        dispatch,
      });
      logIf(extraLogEnabled, () => `register ws callback ${x.id}: ${outcome}`);
    });
    return () => {
      webSocketCallbacks.forEach((x) => {
        const outcome = appWebSocketCtx.unregisterWebSocketCallback(x.id);
        logIf(
          extraLogEnabled,
          () => `unregister ws callback ${x.id}: ${outcome}`,
        );
      });
    };
  }, [dispatch, webSocketCallbacks, appWebSocketCtx, extraLogEnabled]);
};

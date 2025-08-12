import { buildInternalServerError } from "../utils";
import { IWebSocketUrls } from "./interfaces";

const authParameter = "wardaauth";

export const seecommerceWebSocketUrls: IWebSocketUrls = {
  socketUrl: ({ productId, idToken }: { productId: string; idToken: string }) =>
    `/socket/${productId}?${authParameter}=${idToken}`,
  anonymousSocketUrl: ({
    productId,
    tenantId,
  }: {
    productId: string;
    tenantId: string;
  }) => `/anonymous-socket/${productId}/${tenantId}`,
};

export const portalWebSocketUrls: IWebSocketUrls = {
  socketUrl: ({ idToken }: { idToken: string }) =>
    `/portals?${authParameter}=${idToken}`,
  anonymousSocketUrl: ({
    productId,
    tenantId,
  }: {
    productId: string;
    tenantId: string;
  }) => {
    console.error(
      `Use of WebSocket in anonymous mode not yet foreseen for portals [${productId}, ${tenantId}]`,
    );
    throw buildInternalServerError(400, "Bad request");
  },
};

import * as React from "react";
import ReactSeadragon from "./ReactSeadragon";
import Placeholder from "../Placeholder";
import { reducer, reducerInitState, ACTION, inFailed } from "./reducer";
import { Initialize } from "../../interfaces";
import parseDeepZoomXML, { IDeepZoomImageData } from "./utils/parseDeepZoomXML";
import getResponsePayload from "./utils/getResponsePayload";
import { getSrcUrlBase } from "../../utils/getSrcUrlBase";
import { useAppCookiesCtx } from "../../contexts/AppCookiesContext";
import { SignUrl } from "../../contexts/AppCookiesContext/interfaces";
import {
  addingQuerystringCacheBust,
  getRetryDelay,
} from "../../utils/useMediaLoader/utils";
import { useAppHelperCtx } from "../../contexts/AppHelperContext";
import { SerializableParams } from "../../utils";
import addQueryParamsToUrl from "../../utils/addQueryParamsToUrl";
import getTileUrlBase from "./utils/getTileUrlBase";

export interface IImageZoom {
  style?: React.CSSProperties;
  className?: string;
  src: string;
  getSrcFirmed?: SignUrl;
  getAuthorization?: () => string;
  getTileAdditionalParams?: () => SerializableParams;
}

const getDeepZoomImageData = async ({
  url,
  urlFirmed,
  authorization,
}: {
  url: string;
  urlFirmed: boolean;
  authorization?: string;
}): Promise<IDeepZoomImageData> => {
  const responsePayload = await getResponsePayload({
    url,
    urlFirmed,
    authorization,
  });
  const deepZoomImageData = parseDeepZoomXML(responsePayload);
  return deepZoomImageData;
};

const getTileSources = async ({
  url,
  authorization,
  getSrcFirmed,
  cacheBust,
  getTileAdditionalParams,
}: {
  url: string;
  authorization?: string;
  getSrcFirmed?: SignUrl;
  cacheBust: string;
  getTileAdditionalParams?: () => SerializableParams;
}): Promise<object> => {
  let srcUrl = url;
  let urlFirmed = false;
  if (!!getSrcFirmed) {
    // l'url firmato è sempre univoco quindi il retry se ne crea uno nuovo
    srcUrl = await getSrcFirmed(url);
    urlFirmed = true;
  }
  const tileUrlBase = getTileUrlBase(url);
  const deepZoomImageData = await getDeepZoomImageData({
    url: srcUrl,
    urlFirmed,
    authorization,
  });
  const tileSources = {
    width: deepZoomImageData.width,
    height: deepZoomImageData.height,
    tileSize: deepZoomImageData.tileSize,
    tileOverlap: deepZoomImageData.overlap,
    getTileUrl: (level: number, x: number, y: number): string => {
      const tileUrl = addingQuerystringCacheBust(
        `${tileUrlBase}${level}/${x}_${y}.${deepZoomImageData.format}`,
        cacheBust,
      );
      return getTileAdditionalParams
        ? addQueryParamsToUrl(tileUrl, getTileAdditionalParams())
        : tileUrl;
    },
  };
  return tileSources;
};

const ImageZoom = ({
  style,
  className,
  src,
  getSrcFirmed,
  getAuthorization,
  getTileAdditionalParams,
}: IImageZoom) => {
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const cacheBust = useAppHelperCtx(false)?.getCacheBust();
  const { zoomSourceInit, srcStored, retry, error, tiles } = state;
  const handlerRef = React.useRef<NodeJS.Timeout | null>(null);

  const isFailed = inFailed(state);
  const appCookiesCtx = useAppCookiesCtx(false);
  const actualGetAuthorization =
    getAuthorization || appCookiesCtx?.getAuthCookiesHelper().getAuthorization;
  const authorization = actualGetAuthorization
    ? actualGetAuthorization()
    : undefined;
  const ajaxHeaders: HeadersInit = React.useMemo(
    () =>
      !!authorization
        ? {
            Authorization: authorization,
          }
        : null,
    [authorization],
  );

  const onRenderLoading = React.useCallback(() => {
    dispatch({ type: ACTION.RENDER_LOADING });
  }, []);
  const onRenderSucc = React.useCallback(() => {
    dispatch({ type: ACTION.RENDER_SUCC });
  }, []);
  const onRenderFail = React.useCallback(() => {
    dispatch({
      type: ACTION.FAILED,
      src,
      key: "zoomRenderInit",
      error: "Unable load tiles",
    });
  }, [src]);

  React.useEffect(() => {
    return () => {
      if (handlerRef.current) clearTimeout(handlerRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!!authorization) {
      dispatch({ type: ACTION.RESET });
    }
  }, [authorization]);

  React.useEffect(() => {
    if (!src) {
      dispatch({ type: ACTION.NO_SRC });
    }
  }, [src]);

  React.useEffect(() => {
    const oldUrl = getSrcUrlBase(srcStored);
    const newUrl = getSrcUrlBase(src);
    if (!!newUrl && oldUrl !== newUrl) {
      dispatch({ type: ACTION.CHANGE, value: newUrl });
    }
  }, [src, srcStored]);

  React.useEffect(() => {
    (async () => {
      if (zoomSourceInit === Initialize.START) {
        try {
          dispatch({ type: ACTION.SOURCE_LOADING });
          const tileSources = await getTileSources({
            url: src,
            authorization,
            getSrcFirmed,
            cacheBust,
            getTileAdditionalParams,
          });
          dispatch({
            type: ACTION.SOURCE_SUCC,
            value: tileSources,
          });
        } catch (err) {
          console.error(
            `Failed to set Tile Sources: `,
            err instanceof Error ? err.message : err,
          );
          const error = `Failed to setup zoom component!`;
          const delay = getRetryDelay();
          if (handlerRef.current) clearTimeout(handlerRef.current);
          handlerRef.current = setTimeout(() => {
            dispatch({
              type: ACTION.FAILED,
              key: "zoomSourceInit",
              src,
              error,
            });
            handlerRef.current = null;
          }, delay);
        }
      }
    })();
  }, [
    getSrcFirmed,
    src,
    zoomSourceInit,
    authorization,
    cacheBust,
    getTileAdditionalParams,
  ]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        display: "flex",
        ...style,
      }}
    >
      {isFailed ? (
        <Placeholder
          icon="warning"
          label={error}
          labelStyle={{ maxWidth: 800 }}
        />
      ) : (
        <ReactSeadragon
          tileSources={tiles}
          retry={retry}
          onLoading={onRenderLoading}
          onLoadFail={onRenderFail}
          onLoadSucc={onRenderSucc}
          ajaxHeaders={ajaxHeaders}
        />
      )}
    </div>
  );
};

export default ImageZoom;

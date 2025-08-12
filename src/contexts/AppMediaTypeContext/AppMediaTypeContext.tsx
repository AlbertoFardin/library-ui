import * as React from "react";
import { MediaData, MediaKind, MEDIADATA, getMediaKind } from "./constants";
import { ApiGWCaller } from "../ApiGWCaller";
import { Initialize } from "../../interfaces";
import { IAuthCookiesHelper } from "../AppCookiesContext";
import { IErrorResponse, isIErrorResponse } from "../utils";

export interface IMediaTypeHelper {
  mediaApiUrl: { url: () => string; method: string };
  authCookiesHelper?: IAuthCookiesHelper;
  baseUrl: string;
}

interface AppMediaTypeContextValue {
  mediaData: MediaData | null;
  mediaKind: (mimeType: string) => MediaKind;
}

const AppMediaTypeContext = React.createContext<
  AppMediaTypeContextValue | undefined
>(undefined);

export const useAppMediaTypeCtx = (): AppMediaTypeContextValue => {
  const context = React.useContext(AppMediaTypeContext);
  if (!context) {
    throw new Error("useMediaType must be used within a AppMediaTypeProvider");
  }
  return context;
};

interface IAppMediaTypeProvider {
  children: React.ReactNode;
  mediaTypeHelper?: IMediaTypeHelper; // It should be unvalued only for tests where hardwired values ​​will be used.
  disabled?: boolean;
  onError?: (error: IErrorResponse) => void;
}

export const AppMediaTypeProvider = ({
  children,
  mediaTypeHelper,
  disabled = false,
  onError,
}: IAppMediaTypeProvider) => {
  const [mediaData, setMediaData] = React.useState<MediaData>(MEDIADATA);
  const [init, setInit] = React.useState<Initialize>(Initialize.START);

  React.useEffect(() => {
    (async () => {
      if (init === Initialize.START && !disabled) {
        try {
          if (mediaTypeHelper == null) throw "missing mediaTypeHelper";
          setInit(Initialize.WAIT);
          const data = await ApiGWCaller({
            baseUrl: mediaTypeHelper.baseUrl,
          }).doCall<null, MediaData>({
            ...{
              url: mediaTypeHelper.mediaApiUrl.url(),
              method: mediaTypeHelper.mediaApiUrl.method,
            },
            data: null,
            withCredentials: mediaTypeHelper.authCookiesHelper != null,
            authorization:
              mediaTypeHelper?.authCookiesHelper?.getAuthorization(),
          });
          setMediaData(data);
          setInit(Initialize.SUCC);
        } catch (error) {
          if (!!onError && isIErrorResponse(error)) {
            onError(error);
          }
          console.warn("use wired mimetypes and renditions", { error });
          setInit(Initialize.FAIL);
        }
      }
    })();
  }, [init, mediaTypeHelper, disabled, onError]);

  const mediaKind = React.useCallback(
    (mimeType: string): MediaKind => getMediaKind(mimeType, mediaData),
    [mediaData],
  );
  const value = React.useMemo(
    (): AppMediaTypeContextValue => ({
      mediaData,
      mediaKind,
    }),
    [mediaData, mediaKind],
  );

  return <AppMediaTypeContext.Provider value={value} children={children} />;
};

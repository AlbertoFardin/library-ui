import * as React from "react";
import { reducer, reducerInitState, ACTION, IReducerState } from "./reducer";
import {
  getRetryDelay,
  addingQuerystringKeyRetry,
  addingQuerystringCacheBust,
} from "./utils";
import { useAppCookiesCtx } from "../../contexts/AppCookiesContext";
import logIf from "../logIf";
import { Initialize } from "../../interfaces";
import { useAppHelperCtx } from "../../contexts/AppHelperContext";

interface IUseMediaLoader {
  srcUrl: string;
  onLoadFail?: (
    event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
  ) => void;
  onLoadSucc?: (
    event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
  ) => void;
  isValidMedia?: boolean;
  retry?: number;
}

const logEvent = false;
const emptyHandle = (
  event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
) => {
  logIf(logEvent, () => `load event: ${JSON.stringify(event)}`);
};

interface IUseMediaLoaderReturn extends IReducerState {
  handleLoadSucc: (
    event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
  ) => void;
  handleLoadFail: (
    event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
  ) => void;
}

const useMediaLoader = ({
  srcUrl,
  onLoadFail = emptyHandle,
  onLoadSucc = emptyHandle,
  isValidMedia = true,
  retry: retryMax = 12,
}: IUseMediaLoader): IUseMediaLoaderReturn => {
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const { initialize, retry } = state;
  const cacheBust = useAppHelperCtx(false)?.getCacheBust();
  const signUrl = useAppCookiesCtx(false)?.getAuthCookiesHelper().signUrl;
  const handlerRef = React.useRef<NodeJS.Timeout | null>(null);
  const handleLoadSucc = React.useCallback(
    (
      event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
    ) => {
      onLoadSucc(event);
      dispatch({ type: ACTION.LOAD_SUCC });
    },
    [onLoadSucc],
  );
  const handleLoadFail = React.useCallback(
    (
      event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
    ) => {
      if (onLoadFail) onLoadFail(event);
      const delay = getRetryDelay();
      if (handlerRef.current) clearTimeout(handlerRef.current);
      handlerRef.current = setTimeout(() => {
        dispatch({ type: ACTION.LOAD_FAIL, retryMax });
        handlerRef.current = null;
      }, delay);
    },
    [onLoadFail, retryMax],
  );

  React.useEffect(() => {
    return () => {
      if (handlerRef.current) clearTimeout(handlerRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!srcUrl) {
      dispatch({ type: ACTION.ERROR_MISSING_SRC });
      return;
    }
    if (!isValidMedia) {
      dispatch({ type: ACTION.ERROR_INVALID_TYPE });
      return;
    }
    dispatch({ type: ACTION.CHANGE_SRC, src: srcUrl });
  }, [isValidMedia, srcUrl]);

  React.useEffect(() => {
    const prepareSrc = async () => {
      let nextSrc = addingQuerystringCacheBust(
        addingQuerystringKeyRetry(srcUrl, retry),
        cacheBust,
      );
      if (signUrl) {
        nextSrc = await signUrl(nextSrc);
      }
      dispatch({ type: ACTION.SIGNED_SRC, src: nextSrc });
    };

    if (initialize === Initialize.WAIT) {
      prepareSrc();
    }
  }, [initialize, retry, signUrl, srcUrl, cacheBust]);

  return { ...state, handleLoadSucc, handleLoadFail };
};

export default useMediaLoader;

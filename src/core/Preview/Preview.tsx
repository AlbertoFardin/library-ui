import * as React from "react";
import { createUseStyles } from "react-jss";
import BtnBase, { IKeyDown } from "../BtnBase";
import classnames from "classnames";
import emptyFn from "../../utils/emptyFn";
import IPreviewRender from "./IPreviewRender";
import PreviewRenderPlaceholder from "./PreviewRenderPlaceholder";
import PreviewRenderImage from "./PreviewRenderImage";
import PreviewRenderVideo from "./PreviewRenderVideo";
import { Initialize } from "../../interfaces";
import getPreviewSrcUrl from "./getPreviewSrcUrl";
import { getTheme } from "../../theme";
import { typeDocument, typeImage, typeVideo } from "../../utils/mimeTypes";
import { reducer, reducerInitState, ACTION } from "./reducer";

const RETRY_COUNT = 10;
const RETRY_DELAY = 10000;

interface IStyles {
  color: string;
  previewHeight: number;
  previewWidth: number;
  borderRadius: number;
}
const useStyles = createUseStyles({
  preview: {
    position: "relative",
    boxSizing: "border-box",
    margin: 0,
    overflow: "hidden",
    borderRadius: ({ borderRadius }: IStyles) => borderRadius,
    color: ({ color }: IStyles) => color,
    minWidth: ({ previewWidth }: IStyles) => previewWidth,
    minHeight: ({ previewHeight }: IStyles) => previewHeight,
    maxWidth: ({ previewWidth }: IStyles) => previewWidth,
    maxHeight: ({ previewHeight }: IStyles) => previewHeight,
    width: ({ previewWidth }: IStyles) => previewWidth,
    height: ({ previewHeight }: IStyles) => previewHeight,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      transition: "all 250ms",
      userSelect: "none",
      maxWidth: ({ previewWidth }: IStyles) => previewWidth,
      maxHeight: ({ previewHeight }: IStyles) => previewHeight,
    },
  },
});

export interface IPreview {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  previewHeight: number;
  previewWidth: number;
  onClick?: (event: React.MouseEvent, keyDown: IKeyDown) => void;
  onDoubleClick?: (event: React.MouseEvent, keyDown: IKeyDown) => void;
  onLoadError?: (
    event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
  ) => void;
  onLoadSuccess?: (
    event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
  ) => void;
  placeholderIcon?: string;
  placeholderIconStyle?: React.CSSProperties;
  placeholderIconClassName?: string;
  placeholderLabel?: string;
  placeholderLabelStyle?: React.CSSProperties;
  placeholderLabelClassName?: string;
  placeholderLabelRequired?: boolean;
  srcUrl: string;
  mimeType: string;
  mousehover?: boolean;
  disabled?: boolean;
}

const Preview = React.forwardRef(
  (props: IPreview, ref: React.Ref<HTMLDivElement>) => {
    const {
      className,
      style,
      color = getTheme().colors.theme1,
      previewHeight,
      previewWidth,
      onClick,
      onDoubleClick,
      onLoadError = emptyFn,
      onLoadSuccess = emptyFn,
      placeholderIcon,
      placeholderIconStyle,
      placeholderIconClassName,
      placeholderLabel,
      placeholderLabelStyle,
      placeholderLabelClassName,
      placeholderLabelRequired,
      srcUrl,
      mimeType,
      mousehover,
      disabled,
    } = props;

    const classes = useStyles({
      color,
      previewHeight,
      previewWidth,
      borderRadius: getTheme().borderRadius,
    });
    const [state, dispatch] = React.useReducer(reducer, reducerInitState);
    const { initialize, loadRetry, loadCount } = state;

    const srcUrlMemo = React.useMemo(() => {
      return getPreviewSrcUrl(srcUrl, loadCount);
    }, [loadCount, srcUrl]);
    const isVideo = new Set(typeVideo).has(mimeType);
    const isImage = new Set(typeImage).has(mimeType);
    const isDocument = new Set(typeDocument).has(mimeType);
    const srcType = isVideo || isImage || isDocument;

    const onLoadSucc = React.useCallback(
      (event) => {
        dispatch({ type: ACTION.INIT_SUCC });
        onLoadSuccess(event);
      },
      [onLoadSuccess],
    );
    const onLoadFail = React.useCallback(
      (event) => {
        dispatch({ type: ACTION.INIT_FAIL, retry: true });
        onLoadError(event);
      },
      [onLoadError],
    );
    const propsPreviewRender: IPreviewRender = {
      initialize,
      onLoadSucc,
      onLoadFail,
      srcUrl: srcUrlMemo,
      mousehover: disabled ? false : mousehover,
    };

    React.useEffect(() => {
      if (!!srcUrl && srcType === true) {
        dispatch({ type: ACTION.INIT_START });
      } else {
        dispatch({ type: ACTION.INIT_FAIL });
      }
    }, [srcUrl, srcType]);

    React.useEffect(() => {
      const fnRetry = setInterval(() => {
        if (
          initialize === Initialize.FAIL &&
          loadRetry &&
          loadCount <= RETRY_COUNT
        ) {
          dispatch({ type: ACTION.INIT_START });
        }
      }, RETRY_DELAY);
      return () => clearInterval(fnRetry);
    }, [initialize, loadCount, loadRetry]);

    return (
      <BtnBase
        ref={ref}
        color={color}
        className={classnames({
          [classes.preview]: true,
          [className]: !!className,
        })}
        style={style}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        disabled={disabled}
        clickExclusive
      >
        {initialize === Initialize.FAIL ? (
          <PreviewRenderPlaceholder
            size={Math.min(previewWidth, previewHeight)}
            icon={placeholderIcon}
            iconStyle={placeholderIconStyle}
            iconClassName={placeholderIconClassName}
            label={placeholderLabel}
            labelStyle={placeholderLabelStyle}
            labelClassName={placeholderLabelClassName}
            labelRequired={placeholderLabelRequired}
          />
        ) : null}
        {initialize !== Initialize.FAIL && (isImage || isDocument) ? (
          <PreviewRenderImage {...propsPreviewRender} />
        ) : null}
        {initialize !== Initialize.FAIL && isVideo ? (
          <PreviewRenderVideo {...propsPreviewRender} />
        ) : null}
      </BtnBase>
    );
  },
);

export default Preview;

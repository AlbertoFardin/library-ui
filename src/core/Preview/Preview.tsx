import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import BtnBase, { IKeyDown } from "../BtnBase";
import emptyFn from "../../utils/emptyFn";
import IPreviewRender from "./IPreviewRender";
import PreviewRenderPlaceholder from "./PreviewRenderPlaceholder";
import PreviewRenderImage from "./PreviewRenderImage";
import PreviewRenderVideo from "./PreviewRenderVideo";
import { Initialize } from "../../interfaces";
import { getPreviewBackgroundColor } from "./utils";
import { getTheme } from "../../theme";
import Placeholder from "../Placeholder";
import useMediaLoader from "../../utils/useMediaLoader";
import {
  useAppMediaTypeCtx,
  MediaKind,
} from "../../contexts/AppMediaTypeContext";

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
      transition: "transform 250ms", // animazione al mousehover
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
  onContextMenu?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onMouseMove?: (event: React.MouseEvent) => void;
  onLoadFail?: () => void;
  onLoadSucc?: () => void;
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
  objectFit?: "contain" | "cover" | "fill";
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
      onContextMenu,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      onLoadFail = emptyFn,
      onLoadSucc = emptyFn,
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
      objectFit = "contain",
    } = props;

    const appMediaTypeCtx = useAppMediaTypeCtx();
    const classes = useStyles({
      color,
      previewHeight,
      previewWidth,
      borderRadius: getTheme().borderRadius,
    });

    const mediaKind = appMediaTypeCtx.mediaKind(mimeType);
    const { src, initialize, handleLoadSucc, handleLoadFail } = useMediaLoader({
      srcUrl,
      onLoadFail,
      onLoadSucc,
      isValidMedia: mediaKind !== MediaKind.UNKNOWN,
    });

    const size = Math.min(previewWidth, previewHeight);
    const propsPreviewRender: IPreviewRender = {
      srcLoaded: initialize === Initialize.SUCC,
      onLoadSucc: handleLoadSucc,
      onLoadFail: handleLoadFail,
      src,
      mousehover: disabled ? false : mousehover,
      size: size,
      objectFit,
    };

    const previewRenderPlaceholder = () => (
      <PreviewRenderPlaceholder
        size={size}
        icon={placeholderIcon}
        iconStyle={placeholderIconStyle}
        iconClassName={placeholderIconClassName}
        label={placeholderLabel}
        labelStyle={placeholderLabelStyle}
        labelClassName={placeholderLabelClassName}
        labelRequired={placeholderLabelRequired}
      />
    );

    const renderContent = () => {
      if (!src || initialize === Initialize.FAIL)
        return previewRenderPlaceholder();
      switch (mediaKind) {
        case MediaKind.DOC:
        case MediaKind.IMG:
          return <PreviewRenderImage {...propsPreviewRender} />;
        case MediaKind.VID:
          return <PreviewRenderVideo {...propsPreviewRender} />;
        default:
          return null;
      }
    };

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
        onContextMenu={onContextMenu}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        disabled={disabled}
        clickExclusive
      >
        <Placeholder
          open={
            initialize === Initialize.NONE ||
            initialize === Initialize.START ||
            initialize === Initialize.WAIT
          }
          spinnerColor={getTheme().colors.typography}
          spinnerSize={size / 6}
          spinner
          background
          backgroundColor={getPreviewBackgroundColor()}
        />
        {renderContent()}
      </BtnBase>
    );
  },
);

export default Preview;

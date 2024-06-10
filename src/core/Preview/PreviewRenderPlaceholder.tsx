import * as React from "react";
import Placeholder from "../Placeholder";

interface IPreviewRenderPlaceholder {
  size: number;
  icon?: string;
  iconStyle?: React.CSSProperties;
  iconClassName?: string;
  label?: string;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  labelRequired?: boolean;
}

const PreviewRenderPlaceholder = ({
  size,
  icon,
  iconStyle,
  iconClassName,
  label,
  labelStyle,
  labelClassName,
  labelRequired,
}: IPreviewRenderPlaceholder) => (
  <Placeholder
    icon={icon}
    iconStyle={{ fontSize: size / 5, ...iconStyle }}
    iconClassName={iconClassName}
    label={label}
    labelStyle={{ fontSize: size / 6, ...labelStyle }}
    labelClassName={labelClassName}
    labelRequired={labelRequired}
    zIndex={0}
  />
);

export default PreviewRenderPlaceholder;

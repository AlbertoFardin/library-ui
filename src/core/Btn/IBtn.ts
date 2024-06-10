import * as React from "react";
import { IPopoverListItem } from "../PopoverList";
import { PopoverOrigin } from "../Popover";

interface IBtn {
  variant?: "light" | "bold";
  color?: string;
  cmpRef?;
  className?: string;
  style?: React.CSSProperties;
  icon?: string;
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
  label?: string;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  labelWeight?: "regular" | "lighter" | "bolder";
  labelPosition?: "right" | "left";
  labelRequired?: boolean;
  copyToClipboard?: string;
  onCopyToClipboard?: (text: string) => void;
  avatar?: string;
  avatarText?: string;
  avatarIcon?: string;
  avatarClassName?: string;
  avatarStyle?: React.CSSProperties;
  disabled?: boolean;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
  selected?: boolean;
  tooltip?: string | string[];
  tooltipPlace?: "top" | "bottom" | "left" | "right";
  tooltipOpen?: boolean;
  menu?: {
    icon?: boolean;
    iconClassName?: string;
    iconStyle?: React.CSSProperties;
    originTransf?: PopoverOrigin;
    originAnchor?: PopoverOrigin;
    onClose?: () => void;
    items: IPopoverListItem[];
    title?: string;
  };
  small?: boolean;
  badge?: boolean;
  badgeColor?: string;
  children?: JSX.Element | React.ReactNode;
}

export default IBtn;

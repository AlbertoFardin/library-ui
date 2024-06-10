import * as React from "react";
import Modal from "../Modal";
import { PopoverOrigin, getPopoverStyle } from "./utils";
import emptyFn from "../../utils/emptyFn";

const defaultOrigin: PopoverOrigin = { horizontal: "auto", vertical: "auto" };
const defaultPosition = { top: 0, left: 0 };

export interface IPopover {
  className?: string;
  style?: React.CSSProperties;
  open: boolean;
  onClose?: (event: React.MouseEvent) => void;
  anchorReference?: "anchorEl" | "anchorPosition";
  anchorPosition?: { top: number; left: number };
  anchorEl?;
  originAnchor?: PopoverOrigin;
  originTransf?: PopoverOrigin;
  positionZone?: 1 | 2 | 3 | 4;
}
interface IPopoverCmp extends IPopover {
  children: JSX.Element | React.ReactNode;
}
const Popover = ({
  className,
  style,
  open,
  onClose = emptyFn,
  anchorReference = "anchorEl",
  anchorPosition = defaultPosition,
  anchorEl,
  originAnchor = defaultOrigin,
  originTransf = defaultOrigin,
  positionZone,
  children,
}: IPopoverCmp) => (
  <Modal
    open={open}
    onClose={onClose}
    popover
    className={className}
    style={getPopoverStyle({
      style,
      anchorReference,
      anchorPosition,
      anchorEl,
      originAnchor,
      originTransf,
      positionZone,
    })}
    content={children}
  />
);

export default Popover;

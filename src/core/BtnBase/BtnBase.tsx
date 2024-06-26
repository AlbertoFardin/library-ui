import * as React from "react";
import { createUseStyles } from "react-jss";
import { isMobile } from "../../utils/deviceUtils";
import Ink from "react-ink";
import { getTheme } from "../../theme";
import classnames from "classnames";
import Tooltip from "../Tooltip";
import setToClipboard from "copy-to-clipboard";
import emptyFn from "../../utils/emptyFn";

interface IStyles {
  disabled: boolean;
}
const useStyles = createUseStyles({
  btnBase: {
    cursor: ({ disabled }: IStyles) => (disabled ? "inherit" : "pointer"),
    position: "relative",
    outline: "none",
  },
});

export interface IKeyDown {
  isMobile: boolean;
  keyDownCtrl: boolean;
  keyDownMeta: boolean;
}

export interface IBtnBase {
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: JSX.Element | React.ReactNode;
  clickPropagation?: boolean;
  clickExclusive?: boolean;
  clickElapsed?: number;
  onClick?: (event: React.MouseEvent, keyDown: IKeyDown) => void;
  onDoubleClick?: (event: React.MouseEvent, keyDown: IKeyDown) => void;
  onContextMenu?: (event: React.MouseEvent, keyDown: IKeyDown) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onMouseMove?: (event: React.MouseEvent) => void;
  tooltip?: string | string[] | JSX.Element;
  tooltipOpen?: boolean;
  tooltipPlace?: "top" | "bottom" | "left" | "right";
  disabled?: boolean;
  disabledRipple?: boolean;
  copyToClipboard?: string;
  onCopyToClipboard?: (text: string) => void;
}
const BtnBase = React.forwardRef(
  (props: IBtnBase, ref: React.Ref<HTMLDivElement>) => {
    const {
      color = getTheme().colors.theme1,
      className,
      style,
      children,
      clickPropagation = false,
      clickExclusive = false,
      clickElapsed = 350,
      onClick,
      onDoubleClick,
      onContextMenu,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      tooltip,
      tooltipOpen,
      tooltipPlace,
      disabled: disabledProp,
      disabledRipple,
      copyToClipboard,
      onCopyToClipboard = emptyFn,
    } = props;
    const disabled = disabledProp || (!onClick && !onDoubleClick);
    const classes = useStyles({ disabled });

    const clickTimeout = React.useRef(null);
    const clearClickTimeout = () => {
      if (clickTimeout.current !== null) {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
      }
    };

    const cbOnClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!onClick) return;
        onClick(event, {
          isMobile: isMobile(),
          keyDownCtrl: event.ctrlKey || event.metaKey,
          keyDownMeta: event.shiftKey,
        });
      },
      [onClick],
    );
    const cbOnDoubleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!onDoubleClick) return;
        onDoubleClick(event, {
          isMobile: isMobile(),
          keyDownCtrl: false,
          keyDownMeta: false,
        });
      },
      [onDoubleClick],
    );
    const cbHandleClicks = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (disabled === true) return;

        if (!!copyToClipboard) {
          setToClipboard(copyToClipboard);
          onCopyToClipboard(copyToClipboard);
        }

        if (clickPropagation === false) {
          event.preventDefault();
          event.stopPropagation();
        }

        if (clickExclusive === true) {
          if (event?.detail === 1) {
            clickTimeout.current = window.setTimeout(() => {
              cbOnClick(event);
            }, clickElapsed);
          } else if (event?.detail === 2) {
            clearClickTimeout();
            cbOnDoubleClick(event);
          }
        } else {
          if (event?.detail === 1) {
            cbOnClick(event);
          }
          if (event?.detail === 2) {
            cbOnDoubleClick(event);
          }
        }
      },
      [
        cbOnClick,
        cbOnDoubleClick,
        clickElapsed,
        clickExclusive,
        clickPropagation,
        copyToClipboard,
        disabled,
        onCopyToClipboard,
      ],
    );
    const cbContextMenu = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!disabled && onContextMenu) {
          if (clickPropagation === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          onContextMenu(event, {
            isMobile: isMobile(),
            keyDownCtrl: event.ctrlKey || event.metaKey,
            keyDownMeta: event.shiftKey,
          });
        }
      },
      [clickPropagation, disabled, onContextMenu],
    );

    return (
      <Tooltip title={tooltip} open={tooltipOpen} place={tooltipPlace}>
        <div
          ref={ref}
          role={disabled ? "presentation" : "button"}
          tabIndex={-1}
          className={classnames({
            [classes.btnBase]: true,
            [className]: !!className,
          })}
          style={style}
          onClick={cbHandleClicks}
          onContextMenu={cbContextMenu}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          onKeyPress={undefined}
        >
          {disabled || disabledRipple ? null : (
            <Ink style={{ color }} opacity={0.1} />
          )}
          {children}
        </div>
      </Tooltip>
    );
  },
);

BtnBase.displayName = "BtnBase";
export default BtnBase;

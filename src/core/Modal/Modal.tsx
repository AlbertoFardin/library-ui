import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Card from "../Card";
import Portal from "../Portal";
import Backdrop from "../Backdrop";
import { getTheme } from "../../theme";
import Toolbar from "../Toolbar";
import Text from "../Text";
import CircularProgress from "../CircularProgress";
import IconHelp from "../IconHelp";

const size = 100;
const useStyles = createUseStyles({
  "@keyframes blowUpModal": {
    "0%": {
      transform: "scale(0)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
  modal: {
    overflow: "hidden",
    position: "absolute",
    width: "fit-content",
    height: "fit-content",
    zIndex: getTheme().zIndex.modal,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    transform: "scale(0)",
    animation:
      "$blowUpModal 250ms cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards",
  },
  modalIsAlert: {
    margin: "auto",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    minWidth: size,
    minHeight: size,
    maxWidth: window.innerWidth - 30,
    maxHeight: window.innerHeight - 30,
  },
  modalLoading: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackdrop: {
    zIndex: getTheme().zIndex.modal,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    height: "inherit",
    maxHeight: "inherit",
    flex: 1,
  },
  contentMinSize: {
    minWidth: 350,
    padding: "0 15px",
  },
});

export interface IModal {
  className?: string;
  style?: React.CSSProperties;
  open: boolean;
  loading?: boolean;
  title?: string;
  titleHelp?: string | string[];
  titleChildren?: JSX.Element | React.ReactNode;
  onClose: (event: React.MouseEvent) => void;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  content?: JSX.Element | React.ReactNode;
  actionsClassName?: string;
  actionsStyle?: React.CSSProperties;
  actions?: JSX.Element | React.ReactNode;
  popover?: boolean;
}

const Modal = ({
  className,
  style,
  open,
  loading,
  title,
  titleHelp,
  titleChildren,
  onClose,
  contentClassName,
  contentStyle,
  content,
  actionsClassName,
  actionsStyle,
  actions,
  popover,
}: IModal) => {
  const classes = useStyles({});

  if (!open) return null;

  return (
    <Portal>
      <Backdrop
        open={true}
        onClick={onClose}
        className={classes.modalBackdrop}
        invisible={popover}
      />
      <Card
        elevation={popover ? 4 : 1}
        style={style}
        className={classnames({
          [classes.modal]: true,
          [classes.modalIsAlert]: !popover,
          [classes.modalLoading]: loading,
          [className]: !!className,
        })}
      >
        {loading ? (
          <CircularProgress size={size / 2} />
        ) : (
          <>
            {!title ? null : (
              <Toolbar>
                <Text size={2} weight="bolder" children={title} />
                <IconHelp open={!!titleHelp} tooltip={titleHelp} />
                <div style={{ flex: 1 }} />
                {titleChildren}
              </Toolbar>
            )}
            {!content ? null : (
              <div
                style={contentStyle}
                className={classnames({
                  [classes.content]: true,
                  [classes.contentMinSize]: !popover,
                  [contentClassName]: !!contentClassName,
                })}
                children={content}
              />
            )}
            {!actions ? null : (
              <Toolbar style={actionsStyle} className={actionsClassName}>
                {actions}
              </Toolbar>
            )}
          </>
        )}
      </Card>
    </Portal>
  );
};

export default Modal;

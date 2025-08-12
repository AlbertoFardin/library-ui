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
interface IStyles {
  zIndex: number;
  backdropZIndex: number;
}
const useStyles = createUseStyles({
  modal: {
    overflow: "hidden",
    position: "absolute",
    zIndex: ({ zIndex }: IStyles) => zIndex,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: "fit-content",
    height: "fit-content",
  },
  modalIsAlert: {
    margin: "auto",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    minWidth: size,
    minHeight: size,
    maxWidth: "calc(100vw - 30px)",
    maxHeight: "calc(100vh - 30px)",
  },
  modalLoading: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackdrop: {
    zIndex: ({ zIndex, backdropZIndex }: IStyles) => backdropZIndex || zIndex,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flex: "1 1 auto",
    overflowY: "auto",
    minHeight: 0,
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
  zIndex?: number;
  backdropVisible?: boolean;
  backdropClassName?: string;
  backdropStyle?: React.CSSProperties;
  backdropZIndex?: number;
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
  zIndex = getTheme().zIndex.modal,
  backdropVisible = true,
  backdropClassName,
  backdropStyle,
  backdropZIndex,
}: IModal) => {
  const classes = useStyles({ zIndex, backdropZIndex });

  if (!open) return null;

  return (
    <Portal>
      <Backdrop
        open={true}
        onClick={onClose}
        className={classnames({
          [classes.modalBackdrop]: true,
          [backdropClassName]: !!backdropClassName,
        })}
        style={backdropStyle}
        invisible={!backdropVisible}
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
              <Toolbar
                style={actionsStyle}
                className={actionsClassName}
                children={actions}
              />
            )}
          </>
        )}
      </Card>
    </Portal>
  );
};

export default Modal;

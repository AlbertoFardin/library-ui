import * as React from "react";
import Toolbar from "../../Toolbar";
import Text from "../../Text";
import IconDrag from "../../IconDrag";
import CircularProgress from "../../CircularProgress";
import Btn from "../../Btn";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import IconHelp from "../../IconHelp";
import { CLS_DRAGING } from "../constants";
import { getTheme } from "../../../theme";

const useStyles = createUseStyles({
  toolbar: {
    cursor: "move",
    padding: "0 10px",
    transition: "250ms all",
    backgroundColor: getTheme().colors.background,
    "&:hover": {
      backgroundColor: getTheme().colors.mousehover,
    },
  },
  toolbarLabel: {
    marginLeft: 10,
  },
  btnClose: {
    margin: 0,
  },
  loadingSpinner: {
    margin: "0 6px",
  },
  loadingLabel: {
    color: getTheme().colors.theme1,
    fontStyle: "italic",
  },
});

interface IPanelToolbar {
  titleText: string;
  titleInfo: string | string[];
  loadingBool: boolean;
  loadingText: string;
  onClose: () => void;
}
const PanelToolbar = ({
  titleText,
  titleInfo,
  loadingBool,
  loadingText,
  onClose,
}: IPanelToolbar) => {
  const classes = useStyles({});

  const [info, setInfo] = React.useState(false);
  const onInfoShow = React.useCallback(() => setInfo(true), []);
  const onInfoHide = React.useCallback(() => setInfo(false), []);

  return (
    <Toolbar
      className={classnames([CLS_DRAGING, classes.toolbar])}
      onMouseEnter={onInfoShow}
      onMouseLeave={onInfoHide}
    >
      <IconDrag open={info} />
      <Text
        className={classes.toolbarLabel}
        size={2}
        weight="bolder"
        children={titleText}
      />
      <IconHelp tooltip={titleInfo} />
      <div style={{ flex: 1 }} />
      {loadingBool ? (
        <>
          <Text
            className={classes.loadingLabel}
            size={0}
            children={loadingText}
          />
          <CircularProgress className={classes.loadingSpinner} size={14} />
        </>
      ) : (
        <Btn icon="close" onClick={onClose} className={classes.btnClose} />
      )}
    </Toolbar>
  );
};

export default PanelToolbar;

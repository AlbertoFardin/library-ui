import * as React from "react";
import Toolbar from "../../Toolbar";
import Text from "../../Text";
import IconDrag from "../../IconDrag";
import Btn from "../../Btn";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import IconHelp from "../../IconHelp";
import { CLS_DRAGING } from "../constants";
import CircularProgress from "../../CircularProgress";

const useStyles = createUseStyles({
  toolbar: {
    cursor: "move",
    padding: "0 10px",
  },
  toolbarLabel: {
    marginLeft: 10,
  },
  btnClose: {
    margin: 0,
  },
  iconReturn: {
    transform: "rotate(90deg)",
  },
  loadingSpinner: {
    margin: "0 6px",
  },
});

interface IPanelToolbar {
  onClose: () => void;
  onRefresh: () => void;
  loading: boolean;
}
const PanelToolbar = ({ onClose, onRefresh, loading }: IPanelToolbar) => {
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
        children="Public Sets"
      />
      <IconHelp tooltip="Here you can clone a Set from a public one" />
      <div style={{ flex: 1 }} />
      {loading ? (
        <CircularProgress className={classes.loadingSpinner} size={14} />
      ) : (
        <Btn tooltip="Refresh" icon="refresh" onClick={onRefresh} />
      )}
      <Btn
        tooltip="Back"
        icon="u_turn_left"
        iconClassName={classes.iconReturn}
        onClick={onClose}
        className={classes.btnClose}
      />
    </Toolbar>
  );
};

export default PanelToolbar;

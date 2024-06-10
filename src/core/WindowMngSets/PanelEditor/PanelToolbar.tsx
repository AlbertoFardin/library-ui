import * as React from "react";
import Toolbar from "../../Toolbar";
import Text from "../../Text";
import IconDrag from "../../IconDrag";
import Btn from "../../Btn";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import IconHelp from "../../IconHelp";
import { CLS_DRAGING } from "../constants";

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
});

interface IPanelToolbar {
  onClose: () => void;
}
const PanelToolbar = ({ onClose }: IPanelToolbar) => {
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
        children="Set Editor"
      />
      <IconHelp open tooltip="Here you can customize your Set" />
      <div style={{ flex: 1 }} />
      <Btn
        tooltip="Back & Save changes"
        icon="u_turn_left"
        iconClassName={classes.iconReturn}
        onClick={onClose}
        className={classes.btnClose}
      />
    </Toolbar>
  );
};

export default PanelToolbar;

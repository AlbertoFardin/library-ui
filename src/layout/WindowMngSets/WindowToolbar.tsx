import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Toolbar from "../../core/Toolbar";
import Text from "../../core/Text";
import IconDrag from "../../core/IconDrag";
import IconHelp from "../../core/IconHelp";
import { CLS_DRAGING } from "./constants";
import { getTheme } from "../../theme";

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
});

interface IWindowToolbar {
  text: string;
  info?: string | string[];
  children: JSX.Element | React.ReactNode;
}
const WindowToolbar = ({ text, info, children }: IWindowToolbar) => {
  const classes = useStyles({});

  const [hover, setHover] = React.useState(false);
  const onEnter = React.useCallback(() => setHover(true), []);
  const onLeave = React.useCallback(() => setHover(false), []);

  return (
    <Toolbar
      className={classnames([CLS_DRAGING, classes.toolbar])}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <IconDrag open={hover} />
      <Text
        style={{ marginLeft: 10 }}
        size={2}
        weight="bolder"
        children={text}
      />
      <IconHelp tooltip={info} />
      <div style={{ flex: 1 }} />
      {children}
    </Toolbar>
  );
};

export default WindowToolbar;

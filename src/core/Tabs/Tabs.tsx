import * as React from "react";
import Toolbar from "../Toolbar";
import { createUseStyles } from "react-jss";
import { getTheme } from "../../theme";
import TabsItem from "./TabsItem";
import { ITabs } from "./interfaces";
import classnames from "classnames";

const useStyles = createUseStyles({
  tabs: {
    minHeight: 0,
    height: 50,
    alignItems: "stretch",
    overflowX: "auto",
  },
});

const Tabs = ({
  className,
  style,
  onChange,
  items,
  value,
  color: colorProp,
}: ITabs) => {
  const theme = getTheme();
  const color = colorProp || theme.colors.theme1;
  const borderRadius = theme.borderRadius;
  const classes = useStyles();

  return (
    <Toolbar
      style={style}
      className={classnames({
        [classes.tabs]: true,
        [className]: !!className,
      })}
    >
      <div style={{ flex: 1 }} />
      {items.map((t) => (
        <TabsItem
          {...t}
          key={t.id}
          color={color}
          borderRadius={borderRadius}
          selected={t.id === value}
          onClick={onChange}
        />
      ))}
      <div style={{ flex: 1 }} />
    </Toolbar>
  );
};

export default Tabs;

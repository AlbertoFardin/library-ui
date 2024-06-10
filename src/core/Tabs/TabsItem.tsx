import * as React from "react";
import { createUseStyles } from "react-jss";
import Icon from "../Icon";
import classnames from "classnames";
import BtnBase from "../BtnBase";
import Tooltip from "../Tooltip";
import Text from "../Text";
import { ITab } from "./interfaces";
import hexToRgbA from "../../utils/hexToRgbA";

interface IStyles {
  color: string;
  borderRadius: number;
}
const useStyles = createUseStyles({
  tab: {
    position: "relative",
    padding: "0 15px",
    minWidth: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    transition: "all 250ms",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: ({ color }: IStyles) => hexToRgbA(color, 0.1),
    },
  },
  tabSelected: {
    "& *": {
      color: ({ color }: IStyles) => color,
    },
  },
  cursor: {
    borderTopLeftRadius: ({ borderRadius }: IStyles) => borderRadius,
    borderTopRightRadius: ({ borderRadius }: IStyles) => borderRadius,
    position: "absolute",
    width: 50,
    height: 5,
    right: 0,
    bottom: "-5px",
    left: 0,
    margin: "auto",
    transition: "250ms all",
    backgroundColor: ({ color }: IStyles) => color,
  },
  cursorSelected: {
    bottom: 0,
  },
});

interface ITabsItem extends ITab {
  color: string;
  borderRadius: number;
  onClick: (id: string) => void;
  selected: boolean;
}

const TabsItem = ({
  id,
  tooltip,
  label,
  icon,
  className,
  style,
  color,
  borderRadius,
  onClick,
  selected,
}: ITabsItem) => {
  const classes = useStyles({
    color,
    borderRadius,
  });
  const onSelect = React.useCallback(() => {
    onClick(id);
  }, [id, onClick]);

  return (
    <Tooltip key={id} title={tooltip}>
      <BtnBase
        disabled={!onClick || selected}
        color={color}
        onClick={onSelect}
        style={style}
        className={classnames({
          [classes.tab]: true,
          [classes.tabSelected]: selected,
          [className]: !!className,
        })}
      >
        {!icon ? null : <Icon children={icon} />}
        <Text weight="bolder" children={label} style={{ margin: "0 5px" }} />
        <div
          className={classnames({
            [classes.cursor]: true,
            [classes.cursorSelected]: selected,
          })}
        />
      </BtnBase>
    </Tooltip>
  );
};

export default TabsItem;

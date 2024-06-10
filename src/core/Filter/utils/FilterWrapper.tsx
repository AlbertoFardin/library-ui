import * as React from "react";
import { getTheme } from "../../../theme";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Collapse from "../../Transitions/Collapse";
import Icon from "../../Icon";
import CircularProgress from "../../CircularProgress";
import Text from "../../Text";
import IconHelp from "../../IconHelp";
import FilterCount from "./FilterCount";
import isEmpty from "lodash-es/isEmpty";

const useStyle = createUseStyles({
  facet: {
    position: "relative",
  },
  header: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 40,
  },
  headerCursorPointer: {
    cursor: "pointer",
  },
  headerLabelSub: {
    margin: "-10px 0 10px 24px",
    color: getTheme().colors.disable,
    textAlign: "left",
  },
});

interface IFilterWrapper {
  color: string;
  children: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
  count?: number;
  collapsedHide?: boolean;
  label: string;
  labelSub?: string;
  collapsed?: boolean;
  collapsedHelp?: string | string[];
  help?: string | string[];
  onClickCount?: () => void;
  mandatory?: boolean;
  loading?: boolean;
}

const FilterWrapper = ({
  color,
  children,
  className,
  style,
  count,
  collapsedHide,
  label,
  labelSub,
  collapsed,
  collapsedHelp,
  help,
  onClickCount,
  mandatory,
  loading,
}: IFilterWrapper) => {
  const classes = useStyle({});
  const [collapse, setCollapse] = React.useState(collapsed);
  const onCollapse = React.useCallback(() => {
    if (!collapsed && !collapsedHide) setCollapse(!collapse);
  }, [collapse, collapsed, collapsedHide]);

  React.useEffect(() => {
    setCollapse(collapsed);
  }, [collapsed]);

  return (
    <div
      style={style}
      className={classnames({
        [classes.facet]: true,
        [className]: !!className,
      })}
    >
      <div
        role="presentation"
        className={classnames({
          [classes.header]: true,
          [classes.headerCursorPointer]: !collapsedHide,
        })}
        onClick={onCollapse}
      >
        {loading ? (
          <CircularProgress color={color} size={15} />
        ) : collapsedHide ? null : (
          <Icon
            children={collapse ? "keyboard_arrow_down" : "keyboard_arrow_up"}
          />
        )}
        <Text
          ellipsis
          style={{ marginLeft: 8, maxWidth: 130 }}
          children={label}
        />
        {!mandatory ? null : (
          <span style={{ marginLeft: 2, color: "#f00" }} children={"*"} />
        )}
        <div style={{ flex: 1 }} />
        {!onClickCount ? null : (
          <FilterCount
            color={color}
            open={!!count}
            label={count}
            onClick={onClickCount}
          />
        )}
        {collapsed ? (
          <IconHelp open={!isEmpty(collapsedHelp)} tooltip={collapsedHelp} />
        ) : (
          <IconHelp open={!isEmpty(help)} tooltip={help} />
        )}
      </div>
      {!labelSub || collapse ? null : (
        <Text ellipsis className={classes.headerLabelSub} children={labelSub} />
      )}
      <Collapse open={!collapse && !loading} children={children} />
    </div>
  );
};

export default FilterWrapper;

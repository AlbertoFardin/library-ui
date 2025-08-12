import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import isEmpty from "lodash-es/isEmpty";
import { getTheme } from "../../../theme";
import Collapse from "../../Transitions/Collapse";
import CircularProgress from "../../CircularProgress";
import Text from "../../Text";
import IconHelp from "../../IconHelp";
import FilterCount from "./FilterCount";
import Btn from "../../Btn";

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
  label: string;
  labelSub?: string;
  collapsed?: boolean;
  collapsedHelp?: string | string[];
  collapsedHide?: boolean;
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
  label,
  labelSub,
  collapsed,
  collapsedHelp,
  collapsedHide,
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
      {!label ? null : (
        <div className={classes.header}>
          {loading ? (
            <CircularProgress color={color} size={15} />
          ) : collapsedHide ? null : (
            <Btn
              icon={collapse ? "keyboard_arrow_down" : "keyboard_arrow_up"}
              onClick={onCollapse}
            />
          )}
          <Text
            ellipsis
            style={{ marginLeft: 2, maxWidth: 130 }}
            children={label}
          />
          {!mandatory ? null : (
            <span style={{ marginLeft: 2, color: "#f00" }} children="*" />
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
      )}
      {!labelSub || collapse ? null : (
        <Text ellipsis className={classes.headerLabelSub} children={labelSub} />
      )}
      <Collapse open={!collapse && !loading} children={children} />
    </div>
  );
};

export default FilterWrapper;

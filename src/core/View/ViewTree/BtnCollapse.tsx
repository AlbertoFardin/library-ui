import * as React from "react";
import Icon from "../../Icon";
import classnames from "classnames";
import useStyles from "./useStylesBtn";
import CircularProgress from "../../CircularProgress";

interface IBtnCollapse {
  color: string;
  id: string;
  size: number;
  hasChildren: boolean;
  collapse: boolean;
  onClick: (id: string) => void;
  loading: boolean;
}

const BtnCollapse = ({
  color,
  id,
  size,
  hasChildren,
  collapse,
  onClick,
  loading,
}: IBtnCollapse) => {
  const classes = useStyles({ size, color });
  const onClickCb = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick(id);
    },
    [id, onClick],
  );

  if (loading) {
    return (
      <CircularProgress
        color={color}
        style={{ margin: "0 5px" }}
        size={20}
        thickness={10}
      />
    );
  }

  if (!hasChildren) return <div className={classes.placeholder} />;

  return (
    <div
      role="presentation"
      style={{ zIndex: 1 }}
      className={classes.button}
      onClick={onClickCb}
    >
      <Icon
        className={classnames({
          [classes.icon]: true,
          [classes.iconCollapsed]: collapse,
        })}
        children="keyboard_arrow_down"
      />
    </div>
  );
};

export default BtnCollapse;

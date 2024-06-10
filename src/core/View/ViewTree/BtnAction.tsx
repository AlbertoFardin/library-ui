import * as React from "react";
import Icon from "../../Icon";
import Tooltip from "../../Tooltip";
import useStyles from "./useStylesBtn";
import classnames from "classnames";

interface IBtnAction {
  className?: string;
  style?: React.CSSProperties;
  color: string;
  listitemId: string;
  icon: string;
  size: number;
  tooltip: string;
  onClick: (id: string) => void;
}

const BtnAction = ({
  className,
  style,
  color,
  listitemId,
  icon,
  size,
  tooltip,
  onClick,
}: IBtnAction) => {
  const classes = useStyles({ color, size });
  const onClickCb = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick(listitemId);
    },
    [listitemId, onClick],
  );
  return (
    <Tooltip title={tooltip}>
      <div
        className={classnames({
          [classes.button]: true,
          [className]: !!className,
        })}
        style={style}
        role="presentation"
        onClick={onClickCb}
      >
        <Icon className={classes.icon} children={icon} />
      </div>
    </Tooltip>
  );
};

export default BtnAction;

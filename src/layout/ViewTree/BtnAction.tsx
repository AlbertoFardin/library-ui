import * as React from "react";
import classnames from "classnames";
import Icon from "../../core/Icon";
import Tooltip from "../../core/Tooltip";
import useStyles from "./useStylesBtn";

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

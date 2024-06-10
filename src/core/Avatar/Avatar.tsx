import * as React from "react";
import { createUseStyles } from "react-jss";
import Icon from "../Icon";
import Text from "../Text";
import Tooltip from "../Tooltip";
import classnames from "classnames";
import { getTheme } from "../../theme";
import { Initialize } from "../../interfaces";

const useStyles = createUseStyles({
  avatar: {
    position: "relative",
    display: "inline-flex",
    verticalClign: "middle",
    backgroundColor: getTheme().colors.disable,
    borderRadius: 1000,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarSrc: {
    width: "inherit",
  },
  avatarChild: {
    color: getTheme().colors.typography,
  },
});

export interface IAvatar {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  src?: string;
  text?: string;
  icon?: string;
  tooltip?: string;
}
const Avatar = React.forwardRef(
  (props: IAvatar, ref: React.Ref<HTMLDivElement>) => {
    const {
      className,
      style,
      size = 24,
      src = "", // fix null
      text = "",
      icon = "person",
      tooltip,
    } = props;
    const classes = useStyles({});

    const [init, setInit] = React.useState(Initialize.START);
    const onLoadSucc = React.useCallback(() => {
      setInit(Initialize.SUCC);
    }, []);
    const onLoadFail = React.useCallback(() => {
      setInit(Initialize.FAIL);
    }, []);

    return (
      <Tooltip title={tooltip}>
        <div
          ref={ref}
          className={classnames({
            [classes.avatar]: true,
            [className]: !!className,
          })}
          style={{
            ...style,
            minHeight: size,
            maxHeight: size,
            height: size,
            minWidth: size,
            maxWidth: size,
            width: size,
          }}
        >
          {!!src && init !== Initialize.FAIL ? (
            <img
              src={src}
              alt=""
              className={classes.avatarSrc}
              onLoad={onLoadSucc}
              onError={onLoadFail}
            />
          ) : !!text ? (
            <Text className={classes.avatarChild} children={text} />
          ) : (
            <Icon className={classes.avatarChild} children={icon} />
          )}
        </div>
      </Tooltip>
    );
  },
);

export default Avatar;

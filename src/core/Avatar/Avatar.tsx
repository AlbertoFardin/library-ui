import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Icon from "../Icon";
import Text from "../Text";
import Tooltip from "../Tooltip";
import { getTheme } from "../../theme";
import { Initialize } from "../../interfaces";
import useMediaLoader from "../../utils/useMediaLoader";

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
      src: srcUrl,
      text = "",
      icon = "person",
      tooltip,
    } = props;
    const classes = useStyles({});

    const { src, initialize, handleLoadSucc, handleLoadFail } = useMediaLoader({
      srcUrl,
      retry: 3,
    });

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
          {!!src && initialize !== Initialize.FAIL ? (
            <img
              src={src}
              alt=""
              className={classes.avatarSrc}
              onLoad={handleLoadSucc}
              onError={handleLoadFail}
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

import * as React from "react";
import Text from "../Text";
import CircularProgress from "../CircularProgress";
import { getTheme } from "../../theme";
import classnames from "classnames";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  textloading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    height: "fit-content",
  },
});

export interface ITextLoading {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  open?: boolean;
  text?: string;
}
const TextLoading = ({
  className,
  style,
  color = getTheme().colors.theme2,
  open = true,
  text = "Loading...",
}: ITextLoading) => {
  const classes = useStyles({});
  if (!open) return null;
  return (
    <div
      className={classnames({
        [classes.textloading]: true,
        [className]: !!className,
      })}
      style={style}
    >
      <CircularProgress size={20} color={color} style={{ marginRight: 6 }} />
      <Text style={{ color }} children={text} />
    </div>
  );
};

export default TextLoading;

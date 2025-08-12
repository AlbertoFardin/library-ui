import * as React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import { getTheme } from "../../theme";

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  divider: {
    height: 1,
    minHeight: 1,
    maxHeight: 1,
    width: "initial",
    backgroundColor: ({ color }: IStyles) => color,
  },
});

export interface IDivider {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

const Divider = ({
  className,
  style,
  color = getTheme().colors.grayBorder,
}: IDivider) => {
  const classes = useStyles({ color });
  return (
    <div
      className={classnames({
        [classes.divider]: true,
        [className]: !!className,
      })}
      style={style}
    />
  );
};

export default Divider;

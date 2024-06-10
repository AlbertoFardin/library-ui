import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";

const useStyles = createUseStyles({
  list: {
    width: "inherit",
    overflow: "auto",
    padding: "8px 0",
    margin: 0,
  },
});

export interface IList {
  className?: string;
  style?: React.CSSProperties;
  children?: JSX.Element | React.ReactNode;
}
const List = ({ className, style, children }: IList) => {
  const classes = useStyles({});
  return (
    <ul
      style={style}
      className={classnames({
        [classes.list]: true,
        [className]: !!className,
      })}
      children={children}
    />
  );
};

export default List;

import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Text, { IText } from "../Text";
import { getTheme } from "../../theme";

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  link: {
    color: ({ color }: IStyles) => color,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export interface ILink extends IText {
  color?: string;
  onClick: (event: React.MouseEvent) => void;
}

const Link = (p: ILink) => {
  const classes = useStyles({
    color: p.color || getTheme().colors.theme1,
  });
  const cbClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      p.onClick(event);
    },
    [p],
  );

  return (
    <Text
      {...p}
      onClick={cbClick}
      weight={p.weight}
      className={classnames({
        [p.className]: !!p.className,
        [classes.link]: true,
      })}
    />
  );
};

export default Link;

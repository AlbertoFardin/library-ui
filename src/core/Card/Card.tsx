import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { getTheme } from "../../theme";
import BtnBase, { IBtnBase } from "../BtnBase";

interface IStyles {
  elevation: number;
}
const useStyles = createUseStyles({
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: getTheme().colors.background,
    borderRadius: getTheme().borderRadius,
    border: ({ elevation }: IStyles) => {
      if (elevation === 0) return "0";
      return `1px solid ${getTheme().colors.grayBorder}`;
    },
    boxShadow: ({ elevation }: IStyles) => {
      const c = getTheme().colors.isDark ? "250,250,250" : "0,0,0";
      switch (elevation) {
        case 0:
        case 1:
          return "0";
        case 2:
          return `0px 2px 1px -1px rgba(${c},0.2), 0px 1px 1px 0px rgba(${c},0.14), 0px 1px 3px 0px rgba(${c},0.12)`;
        case 3:
          return `0px 3px 1px -2px rgba(${c},0.2), 0px 2px 2px 0px rgba(${c},0.14), 0px 1px 5px 0px rgba(${c},0.12)`;
        case 4:
          return `0px 3px 3px -2px rgba(${c},0.2), 0px 3px 4px 0px rgba(${c},0.14), 0px 1px 8px 0px rgba(${c},0.12)`;
        case 5:
          return `0px 2px 4px -1px rgba(${c},0.2), 0px 4px 5px 0px rgba(${c},0.14), 0px 1px 10px 0px rgba(${c},0.12)`;
        case 6:
          return `0px 3px 5px -1px rgba(${c},0.2), 0px 5px 8px 0px rgba(${c},0.14), 0px 1px 14px 0px rgba(${c},0.12)`;
        case 7:
          return `0px 3px 5px -1px rgba(${c},0.2), 0px 6px 10px 0px rgba(${c},0.14), 0px 1px 18px 0px rgba(${c},0.12)`;
        case 8:
          return `0px 4px 5px -2px rgba(${c},0.2), 0px 7px 10px 1px rgba(${c},0.14), 0px 2px 16px 1px rgba(${c},0.12)`;
        case 9:
          return `0px 5px 5px -3px rgba(${c},0.2), 0px 8px 10px 1px rgba(${c},0.14), 0px 3px 14px 2px rgba(${c},0.12)`;
        case 10:
          return `0px 5px 6px -3px rgba(${c},0.2), 0px 9px 12px 1px rgba(${c},0.14), 0px 3px 16px 2px rgba(${c},0.12)`;
        case 11:
          return `0px 6px 6px -3px rgba(${c},0.2), 0px 10px 14px 1px rgba(${c},0.14), 0px 4px 18px 3px rgba(${c},0.12)`;
        default:
          throw new Error(`Unsupported elevation: ${elevation}`);
      }
    },
  },
});

export interface ICard extends IBtnBase {
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
}
const Card = React.forwardRef((prop: ICard, ref: React.Ref<HTMLDivElement>) => {
  const { className, style, elevation = 3 } = prop;
  const classes = useStyles({ elevation });
  return (
    <BtnBase
      {...prop}
      ref={ref}
      style={style}
      className={classnames({
        [classes.card]: true,
        [className]: !!className,
      })}
    />
  );
});

Card.displayName = "Card";
export default Card;

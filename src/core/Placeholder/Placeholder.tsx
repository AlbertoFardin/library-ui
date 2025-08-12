import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Icon from "../Icon";
import Text from "../Text";
import { getTheme } from "../../theme";
import CircularProgress from "../CircularProgress";
import last from "../../utils/last";
import emptyFn from "../../utils/emptyFn";
import hexToRgbA from "../../utils/hexToRgbA";

interface IStyles {
  zIndex: number;
  backgroundColor: string;
}
const useStyle = createUseStyles({
  placeholder: {
    position: "absolute",
    zIndex: ({ zIndex }: IStyles) => zIndex,
    textAlign: "center",
    height: "100%",
    width: "100%",
    userSelect: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  placeholderBackground: {
    backgroundColor: ({ backgroundColor }: IStyles) => backgroundColor,
  },
  placeholderIcon: {
    color: getTheme().colors.disable,
    fontSize: 55,
  },
  placeholderLabel: {
    color: getTheme().colors.disable,
  },
});

export interface IPlaceholder {
  open?: boolean;
  className?: string;
  style?: React.CSSProperties;
  icon?: string;
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
  label?: string | string[];
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  labelRequired?: boolean;
  spinner?: boolean;
  spinnerSize?: number;
  spinnerColor?: string;
  background?: boolean;
  backgroundColor?: string;
  zIndex?: number;
  onClick?: (event: React.MouseEvent) => void;
}

const Placeholder = ({
  open = true,
  className,
  style,
  icon,
  iconClassName,
  iconStyle,
  label,
  labelClassName,
  labelStyle,
  labelRequired,
  spinner,
  spinnerSize = 50,
  spinnerColor = getTheme().colors.theme1,
  background,
  backgroundColor = hexToRgbA(getTheme().colors.background, 0.5),
  zIndex = 1,
  onClick = emptyFn,
}: IPlaceholder) => {
  const classes = useStyle({ zIndex, backgroundColor });

  if (!open) return null;

  return (
    <div
      role="presentation"
      className={classnames({
        [classes.placeholder]: true,
        [classes.placeholderBackground]: background,
        [className]: !!className,
      })}
      style={style}
      onClick={onClick}
    >
      {spinner ? (
        <CircularProgress size={spinnerSize} color={spinnerColor} />
      ) : (
        <>
          {icon && (
            <Icon
              style={iconStyle}
              className={classnames({
                [classes.placeholderIcon]: true,
                [iconClassName]: !!iconClassName,
              })}
              children={icon}
            />
          )}
          {!icon || !label ? null : <div style={{ padding: 5 }} />}
          {!label
            ? null
            : (typeof label === "string" ? [label] : label).map((l, i, a) => (
                <Text
                  key={i}
                  style={labelStyle}
                  className={classnames({
                    [classes.placeholderLabel]: true,
                    [labelClassName]: !!labelClassName,
                  })}
                  children={
                    <>
                      {l}
                      {!labelRequired || l !== last(a) ? null : (
                        <span
                          style={{ color: "#f00", marginLeft: 2 }}
                          children="*"
                        />
                      )}
                    </>
                  }
                />
              ))}
        </>
      )}
    </div>
  );
};
export default Placeholder;

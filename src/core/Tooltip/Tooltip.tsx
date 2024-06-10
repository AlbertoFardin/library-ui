import * as React from "react";
import { createUseStyles } from "react-jss";
import { Tooltip } from "react-tooltip";
import Portal from "../Portal";
import Text from "../Text";
import { v4 as uuidv4 } from "uuid";
import { getFontWeight, getFonts, getTheme } from "../../theme";
import getColorOpposite from "../../utils/getColorOpposite";

const fontFamily = getFonts()[0];
const fontWeight = getFontWeight(fontFamily, "regular");
// this style fix if value is a JSX.Element
const style: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  color: getTheme().colors.background,
  fontFamily: [fontFamily, "Helvetica", "Arial", "sans-serif"]
    .filter((f) => !!f)
    .join(", "),
  fontWeight: fontWeight,
  lineHeight: 1.5,
  fontSize: 12,
  maxWidth: "60vw",
};

const useStyles = createUseStyles({
  tooltip: {
    zIndex: 5000,
    "& *": {
      color: getColorOpposite(getTheme().colors.typography),
    },
  },
});

interface IRenderText {
  value: string | string[] | JSX.Element;
}
const RenderText = ({ value }: IRenderText) => {
  const color = getColorOpposite(getTheme().colors.typography);
  if (typeof value === "string") {
    return <Text style={{ color }} children={value} />;
  }
  if (Array.isArray(value)) {
    return (
      <>
        {value.map((t: string, i: number) => (
          <Text style={{ color }} key={i} children={t} />
        ))}
      </>
    );
  }
  return value;
};

export interface ITooltip {
  open?: boolean;
  title?: string | string[] | JSX.Element;
  place?: "top" | "bottom" | "left" | "right";
  children: JSX.Element;
}

const TooltipCustomized = (props: ITooltip) => {
  const classes = useStyles();
  const tooltipId = uuidv4();
  const { open, title = "", place = "top", children } = props;

  if (!title) return children;

  return (
    <>
      <Portal>
        <Tooltip
          className={classes.tooltip}
          style={{
            backgroundColor: getColorOpposite(getTheme().colors.background),
          }}
          id={tooltipId}
          isOpen={open}
          opacity={1}
          place={place}
        >
          <div style={style}>
            <RenderText value={title} />
          </div>
        </Tooltip>
      </Portal>
      {React.cloneElement(children, {
        "data-tooltip-id": tooltipId,
      })}
    </>
  );
};

export default TooltipCustomized;

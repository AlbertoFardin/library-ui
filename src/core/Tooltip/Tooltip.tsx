import * as React from "react";
import { createUseStyles } from "react-jss";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import Portal from "../Portal";
import Text from "../Text";
import { getFontWeight, getFontsFamily, getTheme } from "../../theme";
import getColorOpposite from "../../utils/getColorOpposite";
import { isMobile } from "../../utils/deviceUtils";
import isDOMElement from "../../utils/isDOMElement";

const fontFamily = getFontsFamily()[0];
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
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

const Tooltip = (props: ITooltip) => {
  const classes = useStyles();
  const tooltipId = React.useMemo(() => uuidv4(), []);
  const { open, title = "", place = "top", children } = props;

  if (isMobile() || !title) return children;

  const needsWrapper = !isDOMElement(children.type);
  const wrappedChild = needsWrapper ? (
    <div
      data-tooltip-id={tooltipId}
      className={props.wrapperClassName}
      style={props.wrapperStyle}
      children={children}
    />
  ) : (
    React.cloneElement(children, { "data-tooltip-id": tooltipId })
  );

  return (
    <>
      <Portal>
        <ReactTooltip
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
        </ReactTooltip>
      </Portal>
      {wrappedChild}
    </>
  );
};

export default Tooltip;

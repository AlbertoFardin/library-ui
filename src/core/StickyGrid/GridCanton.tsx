import * as React from "react";
import { createUseStyles } from "react-jss";
import { getTheme } from "../../theme";

interface IStyles {
  height: number;
  width: number;
  top: number;
  left: number;
  zIndex: number;
}
const useStyles = createUseStyles({
  gridCanton: {
    height: 0,
    position: "sticky",
    top: ({ top }: IStyles) => top,
    left: ({ left }: IStyles) => left,
    zIndex: ({ zIndex }: IStyles) => zIndex,
    boxSizing: "border-box",
  },
  gridDivAbsolute: {
    display: "flex",
    verticalAlign: "middle",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: ({ height }: IStyles) => height,
    width: ({ width }: IStyles) => width,
    backgroundColor: getTheme().colors.background,
  },
});

interface IGridCanton {
  cellRender: () => JSX.Element;
  height: number;
  width: number;
  top: number;
  left: number;
  zIndex: number;
}
const GridCanton = ({
  cellRender,
  height,
  width,
  top,
  left,
  zIndex,
}: IGridCanton) => {
  const classes = useStyles({
    height,
    width,
    top,
    left,
    zIndex,
  });
  return (
    <div className={classes.gridCanton}>
      <div className={classes.gridDivAbsolute} children={cellRender()} />
    </div>
  );
};

export default GridCanton;

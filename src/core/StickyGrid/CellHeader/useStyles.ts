import { createUseStyles } from "react-jss";
import { columnsPadding } from "../statics";
import { getTheme } from "../../../theme";

interface IStyles {
  height: number | string;
  zIndex: number;
  disabled: boolean;
}

const useStyles = createUseStyles({
  cell: {
    cursor: ({ disabled }: IStyles) => (disabled ? "default" : "move"),
    position: "absolute",
    justifyContent: "center",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "stretch",
    verticalAlign: "middle",
    overflow: "hidden",
    backgroundColor: getTheme().colors.background,
    height: ({ height }: IStyles) => height,
    zIndex: ({ zIndex }: IStyles) => zIndex,
    "&:hover": {
      backgroundColor: ({ disabled }: IStyles) =>
        disabled ? getTheme().colors.background : getTheme().colors.mousehover,
    },
    "&:hover $btnRemove": {
      transform: "scale(1)",
    },
    "&:hover $btnSortCount": {
      display: "none",
    },
  },
  cellDragging: {
    boxShadow:
      "0 8px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.1)",
    userSelect: "none",
    outline: "none",
  },
  cellResizable: {
    resize: "horizontal",
  },
  label: {
    padding: `0 ${columnsPadding}px`,
    marginLeft: 10,
    flex: 1,
    color: getTheme().colors.typography,
  },
  btnSortCount: {
    position: "absolute",
    top: 2,
    right: 2,
    borderRadius: 20,
    padding: 0,
    textAlign: "center",
  },
  btnRemove: {
    position: "absolute",
    top: 2,
    right: 2,
    transform: "scale(0)",
  },
  dropIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 2,
    height: ({ height }: IStyles) => height,
    backgroundColor: getTheme().colors.theme1,
  },
});

export default useStyles;

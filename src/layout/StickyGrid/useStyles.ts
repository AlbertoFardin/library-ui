import { createUseStyles } from "react-jss";
import { getTheme } from "../../theme";

const useStyles = createUseStyles({
  gridContainer: {
    height: "100%",
    flex: 1,
    display: "flex",
    "flex-direction": "column",
    position: "relative",
  },
  placeholderTypo: {
    "z-index": 1,
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content": "center",
    height: "100%",
    width: "100%",
  },
  typo: {
    color: getTheme().colors.disable,
    "font-style": "italic",
    "text-align": "center",
  },
});

export default useStyles;

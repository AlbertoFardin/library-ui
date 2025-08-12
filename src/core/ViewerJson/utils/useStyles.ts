import { createUseStyles } from "react-jss";
import { getTheme } from "../../../theme";

export interface IStyles {}

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
    margin: 3,
    padding: 3,
  },

  errorMessage: {
    color: "red",
    display: "flex",
    flexDirection: "row",
    margin: 2,
    padding: 3,
  },

  valueContainer: {
    color: getTheme().colors.typography,
    display: "flex",
    flexDirection: "row",
    margin: 2,
    padding: 3,
  },
});

export default (p: IStyles) => useStyles(p);

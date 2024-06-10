import { createUseStyles } from "react-jss";
import { getFonts, getTheme } from "../../../theme";
import hexToRgbA from "../../../utils/hexToRgbA";

export const fieldHeight = 42;
interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  field: {
    color: getTheme().colors.typography,
    position: "relative",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    boxSizing: "border-box",
    margin: "18px 0",
    minHeight: fieldHeight,
    maxHeight: 120,
    backgroundColor: getTheme().colors.background,
    border: `1px solid ${getTheme().colors.grayBorder}`,
    borderRadius: getTheme().borderRadius,
    verticalAlign: "middle",
  },
  fieldNoMaxHeight: {
    maxHeight: "none",
  },
  fieldCanHover: {
    "&:hover": {
      border: `1px solid ${getTheme().colors.typography}`,
      "& $chipsWrapperDivider": {
        backgroundColor: getTheme().colors.typography,
      },
    },
    "&:focus-within": {
      border: ({ color }: IStyles) => `1px solid ${color}`,
      "& $chipsWrapperDivider": {
        backgroundColor: ({ color }: IStyles) => color,
      },
    },
  },
  fieldDisabled: {
    backgroundColor: getTheme().colors.grayDrawer,
    "& $input": {
      cursor: "default !important",
    },
    "& $chipsWrapperDivider": {
      backgroundColor: getTheme().colors.grayDrawer,
    },
  },
  input: {
    color: getTheme().colors.typography,
    fontSize: "12px",
    fontWeight: "normal",
    fontFamily: [getFonts()[0], "Helvetica", "Arial", "sans-serif"]
      .filter((f) => !!f)
      .join(", "),
    padding: 10,
    boxSizing: "border-box",
    minHeight: 18,
    width: "-webkit-fill-available",
    alignSelf: "stretch",
    resize: "none",
    backgroundColor: "transparent",
    outline: 0,
    border: 0,
    margin: 0,
    overflow: "auto",
    verticalAlign: "top",
    lineHeight: 1.5,
    letterSpacing: "0.015em",
    "&::placeholder": {
      color: getTheme().colors.typography,
      opacity: 0.5,
    },
  },
  chipsWrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
  },
  chipsWrapperList: {
    textAlign: "left",
    overflow: "auto",
    padding: 5,
    flex: 1,
  },
  chipsWrapperDivider: {
    // this class is need to change color on focus
  },
  adornmentIcon: {
    margin: "0px !important",
  },
  adornmentAvatar: {
    margin: "0px !important",
  },
  adornmentElement: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flex: 1,
    margin: "0 5px",
  },
  menuPosRelative: {
    alignSelf: "flex-end",
    margin: "0 5px 5px 0",
  },
  menuPosAbsoluteBot: {
    zIndex: 1,
    transition: "none !important",
    position: "absolute !important",
    bottom: 5,
    right: 5,
  },
  menuPosAbsoluteTop: {
    zIndex: 1,
    transition: "none !important",
    position: "absolute !important",
    top: 5,
    right: 5,
  },
  menu: {
    borderRadius: getTheme().borderRadius,
    backgroundColor: getTheme().colors.background,
  },
  menuButton: {
    margin: 0,
  },
  mentionsInput: {
    flex: 1,
    "& *": {
      color: getTheme().colors.typography,
      fontSize: "12px",
      fontWeight: "normal",
      fontFamily: [getFonts()[0], "Helvetica", "Arial", "sans-serif"]
        .filter((f) => !!f)
        .join(", "),
      outline: "none",
      borderColor: "transparent",
      borderWidth: "2px !important",
      overflowY: "overlay !important",
      maxHeight: "120px !important",
      lineHeight: 1.5,
      letterSpacing: "0.015em",
    },
    "& textarea": {
      borderWidth: "0 !important",
      minHeight: "20px !important",
    },
  },
  mentionsUser: {
    borderRadius: 3,
    backgroundColor: hexToRgbA(getTheme().colors.theme1, 0.25),
  },
  editorWysiwygOnClick: {
    display: "flex",
    flex: 1,
  },
  editorWysiwygReadOnly: {
    overflow: "auto",
    flex: 1,
    minHeight: 120,
    maxHeight: 120,
  },
  editorWysiwygInModal: {
    overflow: "auto",
    flex: 1,
    minHeight: 390,
    maxHeight: 390,
    width: 650,
    border: `1px solid ${getTheme().colors.grayBorder}`,
    borderRadius: getTheme().borderRadius,
  },
});

export default (p: IStyles) => useStyles(p);

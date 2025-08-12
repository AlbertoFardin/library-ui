import * as React from "react";
import { createUseStyles } from "react-jss";
import BtnMenu from "./BtnMenu";
import { IAdornmentMenu, IFieldColor } from "./fieldInterfaces";
import emptyFn from "../../../utils/emptyFn";
import { getTheme } from "../../../theme";

const adornmentUseStyles = createUseStyles({
  menuPosRelative: {
    alignSelf: "flex-end",
    margin: "0 5px 5px 0 !important", // "important" fix style builded in sc
  },
});

export interface IFieldMenu extends IFieldColor, IAdornmentMenu {
  inputHover?: boolean;
}

const FieldMenu = ({
  color = getTheme().colors.theme1,
  menu,
  menuVisibled,
  menuDisabled,
  menuOnHover = true,
  menuOnClose = emptyFn,
  inputHover = false,
  readOnly = false,
}: IFieldMenu) => {
  const classes = adornmentUseStyles();
  const menuLength = !!menu?.length;
  const menuRenderDefault = React.useMemo(() => {
    if (readOnly) return null;
    const width = menuLength ? 35 : 0;
    return <div style={{ width, height: 0, alignSelf: "end" }} />;
  }, [menuLength, readOnly]);

  return (
    <BtnMenu
      color={color}
      className={classes.menuPosRelative}
      onClose={menuOnClose}
      inputHover={inputHover || menuVisibled}
      items={menu}
      disabled={menuDisabled}
      visibleOnHover={menuOnHover}
      renderDefault={menuRenderDefault}
    />
  );
};

export default React.memo(FieldMenu);

import * as React from "react";
import ListItem, { IListItem } from "../ListItem";
import Divider from "../Divider";

export interface IPopoverListItem extends IListItem {
  divider?: boolean;
  hidden?: boolean;
  disableClose?: boolean;
}

const PopoverListItem = (p: IPopoverListItem) => {
  const { onClose, onClick, label, disableClose, hidden, divider } = p;

  const cbOnClick = React.useCallback(
    (event: React.MouseEvent, id: string, buttonId?: string) => {
      event.preventDefault();
      event.stopPropagation();
      if (!!onClick) onClick(event, id, buttonId);
      if (!disableClose) onClose(event);
    },
    [disableClose, onClick, onClose],
  );

  return (
    <>
      {divider ? <Divider style={{ margin: "0 10px" }} /> : null}
      {hidden ? null : <ListItem {...p} label={label} onClick={cbOnClick} />}
    </>
  );
};

export default PopoverListItem;

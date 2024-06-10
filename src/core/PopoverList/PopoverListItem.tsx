import * as React from "react";
import ListItem, { IListItem } from "../ListItem";

export interface IPopoverListItem extends IListItem {
  divider?: boolean;
  hidden?: boolean;
  disableClose?: boolean;
}

const PopoverListItem = (p: IPopoverListItem) => {
  const { onClose, onClick, label, disableClose } = p;

  const cbOnClick = React.useCallback(
    (event: React.MouseEvent, id: string, buttonId?: string) => {
      event.preventDefault();
      event.stopPropagation();
      if (!!onClick) onClick(event, id, buttonId);
      if (!disableClose) onClose(event);
    },
    [disableClose, onClick, onClose],
  );

  return <ListItem {...p} label={label} onClick={cbOnClick} />;
};

export default PopoverListItem;

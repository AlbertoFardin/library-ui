import * as React from "react";
import Divider from "../Divider";
import List from "../List";
import Popover, { IPopover } from "../Popover";
import PopoverListItem, { IPopoverListItem } from "./PopoverListItem";
import Text from "../Text";

export interface IPopoverList extends IPopover {
  actions?: IPopoverListItem[];
  title?: string;
}

const PopoverList = ({
  actions = [],
  title,
  className,
  style,
  open,
  onClose,
  anchorEl,
  anchorReference = "anchorEl",
  originAnchor,
  originTransf,
  anchorPosition,
  positionZone,
}: IPopoverList) => (
  <Popover
    open={open && !!actions.length}
    style={style}
    className={className}
    onClose={onClose}
    anchorEl={anchorEl}
    anchorReference={anchorReference}
    originAnchor={originAnchor}
    originTransf={originTransf}
    anchorPosition={anchorPosition}
    positionZone={positionZone}
  >
    <List>
      {!title ? null : (
        <Text
          ellipsis
          weight="bolder"
          size={2}
          children={title}
          style={{ padding: "5px 15px" }}
        />
      )}
      {actions.reduce((acc, cur: IPopoverListItem) => {
        if (cur.divider) {
          acc.push(
            <Divider key={`${cur.id}_divider`} style={{ margin: "0 10px" }} />,
          );
        }

        if (!cur.hidden) {
          acc.push(<PopoverListItem key={cur.id} {...cur} onClose={onClose} />);
        }
        return acc;
      }, [])}
    </List>
  </Popover>
);

export default PopoverList;

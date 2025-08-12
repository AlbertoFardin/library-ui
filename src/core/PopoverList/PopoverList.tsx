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
  zIndex,
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
    zIndex={zIndex}
  >
    <List style={{ maxHeight: "40vh" }}>
      {!title ? null : (
        <Text
          ellipsis
          weight="bolder"
          children={title}
          style={{ padding: "5px 15px" }}
        />
      )}
      {actions.map((cur: IPopoverListItem) => (
        <PopoverListItem key={cur.id} {...cur} onClose={onClose} />
      ))}
    </List>
  </Popover>
);

export default PopoverList;

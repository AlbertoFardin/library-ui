import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { getTheme } from "../../../../theme";
import Btn from "../../../Btn";
import Icon from "../../../Icon";
import ListItem from "../../../ListItem";
import Checkbox, { SelectType } from "../../../Checkbox";
import { IFieldItem, IFieldPickerDialog } from "../IFieldPicker";
import FieldPickerBtnModify from "../FieldPickerBtnModify";

const CHECKBOX_SIZE = 34;

const useStyles = createUseStyles({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
    userSelect: "none",
    backgroundColor: "transparent",
    textAlign: "left",
    paddingRight: 5,
  },
  rowHover: {
    backgroundColor: getTheme().colors.mousehover,
  },
  rowDragging: {
    backgroundColor: getTheme().colors.background,
    borderRadius: getTheme().borderRadius,
    border: `1px solid ${getTheme().colors.theme2}`,
  },
  iconBox: {
    width: CHECKBOX_SIZE,
    minWidth: CHECKBOX_SIZE,
    maxWidth: CHECKBOX_SIZE,
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  listitem: {
    flex: 1,
    paddingRight: 0,
    paddingLeft: 0,
    overflow: "hidden",
  },
});

interface IFieldPickerListItem {
  dragProvided;
  dragSnapshot;
  onDelete: (id: string) => void;
  readOnly: boolean;
  color: string;
  index: number;
  width: number;
  items: IFieldItem[];
  itemId: string;
  dialogToModify: IFieldPickerDialog;
  isDraggingOver;
  isDragDisabled;
  zIndex?: number;
}
const FieldPickerListItem = ({
  dragProvided,
  dragSnapshot,
  onDelete,
  readOnly,
  color,
  index,
  width,
  items,
  itemId,
  dialogToModify,
  isDraggingOver,
  isDragDisabled,
  zIndex,
}: IFieldPickerListItem) => {
  const classes = useStyles({});

  const { enable, fields, title, titleHelp, onChange, applyText } =
    dialogToModify;
  const [mousehover, setMousehover] = React.useState(false);

  const onMouseEnter = React.useCallback(() => {
    setMousehover(true);
  }, []);

  const onMouseLeave = React.useCallback(() => {
    setMousehover(false);
  }, []);
  const handleModalClose = React.useCallback(() => {
    setMousehover(false);
  }, []);
  const { isDragging } = dragSnapshot;
  const hover = mousehover && !readOnly && !isDraggingOver;
  const itemData = items.find((i) => i.id === itemId);
  const cbDelete = React.useCallback(() => {
    onDelete(itemId);
    setMousehover(false);
  }, [itemId, onDelete]);
  if (!itemData) return null; // see story EmptyItems of FieldPicker
  return (
    <>
      <div
        className={classnames({
          [classes.row]: true,
          [classes.rowHover]: hover,
          [classes.rowDragging]: isDragging,
        })}
        onMouseMove={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={dragProvided.innerRef}
        {...dragProvided.draggableProps}
      >
        <div className={classes.iconBox}>
          {isDragDisabled || readOnly ? (
            <Checkbox disabled selected type={SelectType.RADIO} />
          ) : (
            <Icon children="drag_indicator" {...dragProvided.dragHandleProps} />
          )}
        </div>
        <ListItem
          {...itemData}
          subLabel={
            !itemData.subLabel || itemData.label === itemData.subLabel
              ? undefined
              : itemData.subLabel
          }
          labelWeight="regular"
          className={classnames({
            [classes.listitem]: true,
            [itemData?.className]: !!itemData?.className, // see story EmptyItems of FieldPicker
          })}
        >
          {hover && (
            <>
              <FieldPickerBtnModify
                color={color}
                index={index}
                items={items}
                itemId={itemId}
                enable={enable}
                fields={fields}
                title={title}
                titleHelp={titleHelp}
                onChange={onChange}
                onDialogClose={handleModalClose}
                applyText={applyText}
                dialogWidth={width}
                zIndex={zIndex}
              />
              <Btn icon="cancel" onClick={cbDelete} />
            </>
          )}
        </ListItem>
      </div>
    </>
  );
};

export default FieldPickerListItem;

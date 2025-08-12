import * as React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { getTheme } from "../../../../theme";
import mixColors from "../../../../utils/mixColors";
import Text from "../../../Text";
import FieldPickerListItem from "./FieldPickerListItem";
import { IFieldItem, IFieldPickerDialog } from "../IFieldPicker";

const useStyles = createUseStyles({
  list: {
    overflowY: "auto",
    overflowX: "hidden",
    borderRadius: getTheme().borderRadius,
    padding: "8px 0",
    alignSelf: "stretch",
    position: "relative",
    backgroundColor: getTheme().colors.background,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 26,
  },
  listDisabled: {
    backgroundColor: getTheme().colors.mousehover,
  },
  listDragging: {
    backgroundColor: mixColors(
      0.25,
      getTheme().colors.background,
      getTheme().colors.theme1,
    ),
  },
  placeholder: {
    color: getTheme().colors.disable,
    padding: "0 15px",
    fontStyle: "italic",
    alignContent: "center",
    flex: 1,
  },
});

interface IFieldPickerList {
  color: string;
  width: number;
  value: string[];
  items: IFieldItem[];
  onChange: (value: string[]) => void;
  readOnly: boolean;
  sortable: boolean;
  dialogToModify: IFieldPickerDialog;
  zIndex?: number;
}
const FieldPickerList = ({
  color,
  width,
  value,
  items,
  onChange,
  readOnly,
  sortable,
  dialogToModify,
  zIndex,
}: IFieldPickerList) => {
  const classes = useStyles({});

  const isDragDisabled = readOnly || !sortable;
  const onDragEnd = React.useCallback(
    (result) => {
      if (!result.destination) return null;
      const dragIndexStart = result.source.index;
      const dragIndexEnd = result.destination.index;
      const newIds = Array.from(value);
      const [removed] = newIds.splice(dragIndexStart, 1);
      newIds.splice(dragIndexEnd, 0, removed);
      onChange(newIds);
    },
    [onChange, value],
  );
  const cbOnDelte = React.useCallback(
    (id: string) => {
      const newIds = Array.from(value);
      const indexToRemove = newIds.findIndex((i) => i === id);
      newIds.splice(indexToRemove, 1);
      onChange(newIds);
    },
    [onChange, value],
  );
  if (!items || items.length === 0) return null;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(droppableProvided, droppableSnapshot) => (
          <div
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            className={classnames({
              [classes.list]: true,
              [classes.listDisabled]: readOnly,
              [classes.listDragging]: droppableSnapshot.isDraggingOver,
            })}
          >
            {value.map((itemId, index: number) => (
              <Draggable
                key={itemId}
                draggableId={itemId}
                index={index}
                isDragDisabled={isDragDisabled}
              >
                {(draggableProvided, draggableSnapshot) => (
                  <FieldPickerListItem
                    key={itemId}
                    dragProvided={draggableProvided}
                    dragSnapshot={draggableSnapshot}
                    color={color}
                    index={index}
                    width={width}
                    items={items}
                    itemId={itemId}
                    onDelete={cbOnDelte}
                    readOnly={readOnly}
                    dialogToModify={dialogToModify}
                    isDraggingOver={droppableSnapshot.isDraggingOver}
                    isDragDisabled={isDragDisabled}
                    zIndex={zIndex}
                  />
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
            {value.length !== 0 ? null : (
              <Text
                className={classes.placeholder}
                children={
                  readOnly
                    ? "No value"
                    : items.length === 0
                      ? "No options to select"
                      : "No item selected"
                }
              />
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FieldPickerList;

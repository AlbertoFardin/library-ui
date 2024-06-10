import * as React from "react";
import { getTheme } from "../../../../theme";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { createUseStyles } from "react-jss";
import mixColors from "../../../../utils/mixColors";
import Text from "../../../Text";
import FieldPickerListItem from "./FieldPickerListItem";
import classnames from "classnames";
import { IListItem } from "../../../ListItem";

const useStyles = createUseStyles({
  list: {
    overflow: "auto",
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
  value: string[];
  items: IListItem[];
  onChange: (value: string[]) => void;
  readOnly: boolean;
  sortable: boolean;
}
const FieldPickerList = ({
  value,
  items,
  onChange,
  readOnly,
  sortable,
}: IFieldPickerList) => {
  const classes = useStyles({});
  const slcItems = value
    .map((id) => {
      return items.find((item) => item.id === id);
    })
    .filter((item) => {
      return !!item;
    });

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classnames({
              [classes.list]: true,
              [classes.listDisabled]: readOnly,
              [classes.listDragging]: snapshot.isDraggingOver,
            })}
          >
            {slcItems.map((o, index: number) => (
              <Draggable
                key={o.id}
                draggableId={o.id}
                index={index}
                isDragDisabled={readOnly || !sortable}
              >
                {(provided, snapshot) => (
                  <FieldPickerListItem
                    provided={provided}
                    data={o}
                    isDragging={snapshot.isDragging}
                    onDelete={cbOnDelte}
                    readOnly={readOnly}
                    sortable={sortable}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {slcItems.length !== 0 ? null : (
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

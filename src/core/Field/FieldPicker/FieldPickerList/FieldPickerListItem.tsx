import * as React from "react";
import { getTheme } from "../../../../theme";
import Btn from "../../../Btn";
import Icon from "../../../Icon";
import { createUseStyles } from "react-jss";
import mixColors from "../../../../utils/mixColors";
import classnames from "classnames";
import ListItem, { IListItem } from "../../../ListItem";
import Checkbox, { SelectType } from "../../../Checkbox";

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
    backgroundColor: mixColors(
      0.25,
      getTheme().colors.background,
      getTheme().colors.theme2,
    ),
  },
  iconBox: {
    width: 34,
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconRemove: {
    zIndex: 1,
    position: "absolute",
    right: 7,
    margin: 0,
  },
  listitem: {
    flex: 1,
    paddingRight: 0,
    paddingLeft: 0,
  },
});

interface IFieldPickerListItem {
  provided;
  data: IListItem;
  isDragging: boolean;
  onDelete: (id: string) => void;
  readOnly: boolean;
  sortable: boolean;
}
const FieldPickerListItem = ({
  provided,
  data,
  isDragging,
  onDelete,
  readOnly,
  sortable,
}: IFieldPickerListItem) => {
  const classes = useStyles({});

  const [hover, setHover] = React.useState(false);
  const onMouseEnter = React.useCallback(() => {
    setHover(true);
  }, []);
  const onMouseLeave = React.useCallback(() => {
    setHover(false);
  }, []);

  const { id } = data;
  const cbDelete = React.useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <div
      className={classnames({
        [classes.row]: true,
        [classes.rowHover]: !readOnly && hover,
        [classes.rowDragging]: isDragging,
      })}
      onMouseMove={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className={classes.iconBox}>
        {sortable && !readOnly ? (
          <Icon children="drag_indicator" />
        ) : (
          <Checkbox disabled selected type={SelectType.RADIO} />
        )}
      </div>
      <ListItem
        {...data}
        className={classnames({
          [classes.listitem]: true,
          [data.className]: !!data.className,
        })}
      />
      {readOnly || !hover ? null : (
        <div className={classes.iconBox}>
          <Btn icon="cancel" onClick={cbDelete} />
        </div>
      )}
    </div>
  );
};

export default FieldPickerListItem;

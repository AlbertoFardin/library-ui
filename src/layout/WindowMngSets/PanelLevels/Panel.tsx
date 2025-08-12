import * as React from "react";
import { createUseStyles } from "react-jss";
import PanelToolbar from "./PanelToolbar";
import { Slide } from "../../../core/Transitions";
import { IMngSet, IMngLevel } from "../interfaces";
import { WINDOW_HEIGHT_MAX } from "../constants";
import { getTheme } from "../../../theme";
import { IListItem } from "../../../core/ListItem";
import Text from "../../../core/Text";
import PanelListItem from "./PanelListItem";

const getOptions = (sets: IMngSet[]): IListItem[] => {
  const listitems: IListItem[] = [];
  sets.forEach((s) => {
    const d: IListItem = {
      id: s.id,
      label: s.payload.label,
    };
    listitems.push(d);
  });
  return listitems;
};

const useStyles = createUseStyles({
  panel: {
    width: "100%",
    height: WINDOW_HEIGHT_MAX,
    background: getTheme().colors.background,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  panelcontent: {
    boxSizing: "border-box",
    position: "relative",
    padding: 15,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
  },
  panelInfo: {
    margin: "0 5px 20px 5px",
    color: getTheme().colors.typography,
    opacity: 0.9,
  },
});

interface IPanel {
  color: string;
  open: boolean;
  sets: IMngSet[];
  items: IMngLevel[];
  onClose: () => void;
  onUpdate: (levels: IMngLevel[]) => void;
}

const Panel = ({ color, open, sets, items, onClose, onUpdate }: IPanel) => {
  const classes = useStyles({});
  const options = getOptions(sets);
  const onChange = React.useCallback(
    (id: string, setId: string) => {
      const newItems = Array.from(items);
      const index = newItems.findIndex((i) => i.id === id);
      newItems[index].setId = setId;
      onUpdate(newItems);
    },
    [items, onUpdate],
  );

  return (
    <Slide open={open} className={classes.panel} direction="left">
      <PanelToolbar onClose={onClose} />
      <div className={classes.panelcontent}>
        <Text
          size={0}
          className={classes.panelInfo}
          children="For each Level choose the desired Set you want to be applied by default"
        />
        {items.map((l) => (
          <PanelListItem
            key={l.id}
            color={color}
            level={l}
            options={options}
            onChange={onChange}
          />
        ))}
      </div>
    </Slide>
  );
};

export default Panel;

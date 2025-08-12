import * as React from "react";
import { IMngLevel } from "../interfaces";
import { FieldSelect } from "../../../core/Field";
import { IListItem } from "../../../core/ListItem";

interface IPanelListItem {
  color: string;
  level: IMngLevel;
  options: IListItem[];
  onChange: (levelId: string, setId: string) => void;
}

const PanelListItem = ({ color, level, options, onChange }: IPanelListItem) => {
  const { id, label, setId } = level;
  const cbOnChange = React.useCallback(
    (slcId: string) => {
      onChange(id, slcId);
    },
    [id, onChange],
  );
  return (
    <FieldSelect
      color={color}
      label={label}
      value={[setId]}
      options={options}
      type="singleselect"
      onChange={cbOnChange}
    />
  );
};

export default PanelListItem;

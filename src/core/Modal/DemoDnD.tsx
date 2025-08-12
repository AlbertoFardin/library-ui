import * as React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Btn from "../Btn";
import Text from "../Text";
import Modal from ".";
import { getTheme } from "../../theme";
import mixColors from "../../utils/mixColors";
import Toolbar from "../Toolbar";
import Divider from "../Divider";

const DEFAULT_VALUES = [
  "1_Mela",
  "2_Banana",
  "3_Pera",
  "4_Limone",
  "5_Ananas",
  "6_Melone",
  "7_Pompelmo",
  "8_Arancia",
  "9_Kiwi",
  "10_Uva",
  "11_Ciliegia",
  "12_Mandarino",
  "13_Pesca",
  "14_Albicocca",
  "15_Susina",
  "16_Lampone",
  "17_FruttiDiBosco",
  "18_Cocco",
  "19_Fico",
  "20_Mango",
];

const reorder = (
  entries: string[],
  indexDrag: number,
  indexDrop: number,
): string[] => {
  const result = [...entries];
  const [removed] = result.splice(indexDrag, 1);
  result.splice(indexDrop, 0, removed);
  return result;
};
const RowItem = ({ provided, entry }: { provided; entry: string }) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={{
      ...provided.draggableProps.style,
      padding: 2,
    }}
  >
    <div
      style={{
        backgroundColor: "#f1f1f1",
        borderRadius: getTheme().borderRadius,
        border: `1px solid ${getTheme().colors.theme1}`,
        padding: "5px 10px",
      }}
    >
      <Text children={entry} ellipsis />
    </div>
  </div>
);
const getListStyle = (isDraggingOver): React.CSSProperties => ({
  position: "relative",
  background: isDraggingOver
    ? mixColors(0.1, getTheme().colors.background, getTheme().colors.theme1)
    : "transparent",
  width: 400,
  maxHeight: 300,
  overflow: "auto",
  borderRadius: getTheme().borderRadius,
  border: `1px solid ${getTheme().colors.grayBorder}`,
  padding: "5px 5px",
});

const Demo = () => {
  const [values, setValues] = React.useState<string[]>(DEFAULT_VALUES);
  const [modal, setModal] = React.useState(false);

  const onOpen = React.useCallback(() => setModal(true), []);
  const onClose = React.useCallback(() => setModal(false), []);
  const onDragEnd = React.useCallback(
    (result) => {
      if (!result.destination) return;
      setValues(reorder(values, result.source.index, result.destination.index));
    },
    [values],
  );
  const ListDnD = (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {values.map((entry, index) => (
              <Draggable key={entry} draggableId={entry} index={index}>
                {(provided) => <RowItem provided={provided} entry={entry} />}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

  return (
    <>
      <Toolbar style={{ backgroundColor: getTheme().colors.grayDrawer }}>
        <Btn
          variant="bold"
          color={getTheme().colors.theme1}
          label="OPEN IN MODAL"
          onClick={onOpen}
        />
      </Toolbar>
      <Divider />
      <div style={{ margin: 15 }} children={ListDnD} />
      <Modal
        open={modal}
        onClose={onClose}
        title="Sorting entries"
        contentStyle={{ overflow: "hidden" }} // fix Droppable warning in devtool
        content={ListDnD}
        actions={
          <>
            <div style={{ flex: 1 }} />
            <Btn
              variant="bold"
              color={getTheme().colors.theme1}
              label="APPLY"
              onClick={onClose}
            />
          </>
        }
      />
    </>
  );
};
export default Demo;

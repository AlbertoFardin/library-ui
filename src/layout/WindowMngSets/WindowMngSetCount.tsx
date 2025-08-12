import { IChip } from "../../core/Chip";
import SetCount, { ISetCountCopy } from "../SetCount";
import { IMngChipValue, IMngSetPayload } from "./interfaces";

interface IWindowMngSetCount {
  color: string;
  setPayload: IMngSetPayload;
  chipValues: IMngChipValue[];
  getChip?: (
    chipValue: IMngChipValue,
    setPayload: IMngSetPayload,
    shared?: boolean,
  ) => IChip;
  shared?: boolean;
  copy?: ISetCountCopy;
}

const WindowMngSetCount = ({
  color,
  setPayload,
  chipValues,
  getChip,
  shared = false,
  copy,
}: IWindowMngSetCount) => {
  const { items } = setPayload;
  const chipsId = [...new Set(items.map((c) => c.id))]; // evito i dupplicati
  const chips = chipsId
    .filter((itemId) => {
      const chip = chipValues.find((c) => c.id === itemId);
      return !!chip;
    })
    .map((itemId) => {
      const chip = chipValues.find((c) => c.id === itemId);
      return {
        ...(getChip?.(chip, setPayload, shared) ?? {}),
        id: itemId,
        label: chip.label,
        color,
        selected: true,
      };
    });
  return <SetCount color={color} chips={chips} copy={copy} />;
};
export default WindowMngSetCount;

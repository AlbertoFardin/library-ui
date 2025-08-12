import Btn from "../../../core/Btn";
import WindowToolbar from "../WindowToolbar";

interface IPanelToolbar {
  onClose: () => void;
}
const PanelToolbar = ({ onClose }: IPanelToolbar) => {
  return (
    <WindowToolbar text="Set Editor" info="Here you can customize your Set">
      <Btn
        tooltip="Back & Save changes"
        icon="u_turn_left"
        iconStyle={{ transform: "rotate(90deg)" }}
        onClick={onClose}
        style={{ margin: 0 }}
      />
    </WindowToolbar>
  );
};

export default PanelToolbar;

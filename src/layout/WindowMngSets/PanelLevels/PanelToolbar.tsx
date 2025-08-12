import Btn from "../../../core/Btn";
import WindowToolbar from "../WindowToolbar";

interface IPanelToolbar {
  onClose: () => void;
}
const PanelToolbar = ({ onClose }: IPanelToolbar) => {
  return (
    <WindowToolbar text="Define the Default Set per Level">
      <Btn
        tooltip="Back"
        icon="u_turn_left"
        iconStyle={{ transform: "rotate(90deg)" }}
        onClick={onClose}
        style={{ margin: 0 }}
      />
    </WindowToolbar>
  );
};

export default PanelToolbar;

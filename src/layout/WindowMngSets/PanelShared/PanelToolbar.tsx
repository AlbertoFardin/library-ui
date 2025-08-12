import Btn from "../../../core/Btn";
import CircularProgress from "../../../core/CircularProgress";
import WindowToolbar from "../WindowToolbar";

interface IPanelToolbar {
  onClose: () => void;
  onRefresh: () => void;
  loading: boolean;
  color: string;
}
const PanelToolbar = ({
  onClose,
  onRefresh,
  loading,
  color,
}: IPanelToolbar) => {
  return (
    <WindowToolbar
      text="Public Sets"
      info="Here you can clone a Set from a public one"
    >
      {loading ? (
        <CircularProgress style={{ margin: "0 8px" }} size={14} color={color} />
      ) : (
        <Btn tooltip="Refresh" icon="refresh" onClick={onRefresh} />
      )}
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

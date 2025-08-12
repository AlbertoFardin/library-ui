import Btn from "../../../core/Btn";
import TextLoading from "../../../core/TextLoading";
import WindowToolbar from "../WindowToolbar";

interface IPanelToolbar {
  titleText: string;
  titleInfo: string | string[];
  loadingBool: boolean;
  loadingText: string;
  onClose: () => void;
}
const PanelToolbar = ({
  titleText,
  titleInfo,
  loadingBool,
  loadingText,
  onClose,
}: IPanelToolbar) => {
  return (
    <WindowToolbar text={titleText} info={titleInfo}>
      {loadingBool ? (
        <TextLoading style={{ margin: "0 10px" }} text={loadingText} />
      ) : (
        <Btn style={{ margin: 0 }} icon="close" onClick={onClose} />
      )}
    </WindowToolbar>
  );
};

export default PanelToolbar;

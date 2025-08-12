import Btn from "../../core/Btn";
import { getTheme } from "../../theme";
import { IPopoverListItem } from "../../core/PopoverList";

const style: React.CSSProperties = { margin: 0 };

const BtnContextmenu = ({
  color = getTheme().colors.theme1,
  contextmenu = [],
  disabled,
  onMenuOpen,
  onMenuHide,
  onSingleActionClick,
}: {
  color?: string;
  contextmenu: IPopoverListItem[];
  disabled: boolean;
  onMenuOpen: (event: React.MouseEvent) => void;
  onMenuHide: () => void;
  onSingleActionClick: (event: React.MouseEvent) => void;
}) => {
  if (contextmenu.length === 1)
    return (
      <Btn
        style={style}
        disabled={disabled}
        color={color}
        icon={contextmenu[0].icon}
        tooltip={contextmenu[0].label}
        onClick={onSingleActionClick}
      />
    );

  if (contextmenu.length > 1)
    return (
      <Btn
        style={style}
        disabled={disabled}
        color={color}
        icon="more_vert"
        onClick={onMenuOpen}
        menu={{
          items: contextmenu,
          onClose: onMenuHide,
        }}
      />
    );

  return (
    <Btn style={{ ...style, opacity: 0 }} disabled color={color} icon="help" />
  );
};

export default BtnContextmenu;

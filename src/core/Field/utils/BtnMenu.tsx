import * as React from "react";
import classnames from "classnames";
import Btn from "../../Btn";
import { IPopoverListItem } from "../../PopoverList";
import useStyles from "./useStyles";

interface IBtnMenu {
  zIndex?: number;
  color: string;
  className?: string;
  onClose: () => void;
  inputHover?: boolean;
  items: IPopoverListItem[];
  disabled: boolean;
  visibleOnHover: boolean;
  renderDefault?;
  onMouseEnter?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

const BtnMenu = ({
  zIndex,
  color,
  className,
  onClose,
  inputHover = false,
  items,
  disabled,
  visibleOnHover,
  renderDefault = null,
  onMouseEnter,
  onMouseLeave,
}: IBtnMenu) => {
  const classes = useStyles({ color });
  const isRenderDefault = !items?.length || (visibleOnHover && !inputHover);

  if (isRenderDefault) return renderDefault;

  return (
    <div
      className={classnames({
        [classes.menu]: true,
        [className]: !!className,
      })}
    >
      <Btn
        className={classes.menuButton}
        color={color}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        disabled={disabled}
        icon="more_vert"
        menu={{
          onClose,
          zIndex,
          items,
        }}
      />
    </div>
  );
};

export default BtnMenu;

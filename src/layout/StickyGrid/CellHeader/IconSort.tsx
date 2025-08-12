import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Icon from "../../../core/Icon";
import hexToRgbA from "../../../utils/hexToRgbA";
import { getTheme } from "../../../theme";
import { ISortOrder } from "../../../interfaces";
import BtnBase from "../../../core/BtnBase";

const useStyles = createUseStyles({
  sortBtn: {
    height: 15,
    margin: "0px 2px 0 15px",
    borderRadius: "15%",
    width: "fit-content",
    "&:hover": {
      backgroundColor: hexToRgbA(getTheme().colors.theme1, 0.15),
      "& $sortIcon": {
        color: `${getTheme().colors.theme1} !important`,
      },
    },
  },
  sortBtnHide: {
    opacity: 0,
  },
  sortIcon: {
    fontSize: "24px",
    lineHeight: "14px",
  },
  sortIconSelected: {
    color: getTheme().colors.theme1,
  },
});

interface IIconSort {
  selected: boolean;
  sort: ISortOrder;
  onClick: () => void;
  cellMousehover: boolean;
  cellSortable: boolean;
  cellDragging: boolean;
}

const IconSort = ({
  selected,
  sort,
  onClick,
  cellMousehover,
  cellSortable,
  cellDragging,
}: IIconSort) => {
  const classes = useStyles({});
  const open = (!cellDragging && cellSortable && cellMousehover) || selected;
  return (
    <BtnBase
      className={classnames({
        [classes.sortBtn]: true,
        [classes.sortBtnHide]: !open,
      })}
      onClick={onClick}
      disabled={!open}
    >
      <Icon
        className={classnames({
          [classes.sortIcon]: true,
          [classes.sortIconSelected]: selected,
        })}
        children={sort === ISortOrder.ASC ? "arrow_drop_up" : "arrow_drop_down"}
      />
    </BtnBase>
  );
};

export default IconSort;

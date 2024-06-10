import * as React from "react";
import Skeleton from "../../Skeleton";
import { createUseStyles } from "react-jss";
import Cell from "../Cell/Cell";
import { getTheme } from "../../../theme";

const useStyles = createUseStyles({
  cell: {
    "&:hover $btnCopy": {
      transform: "scale(1)",
    },
  },
  cellValue: {
    width: "-webkit-fill-available",
    display: "inline-flex",
  },
  skl: {
    margin: "0 2px",
    borderRadius: getTheme().borderRadius,
  },
});

export interface ICellSkeleton {
  style: React.CSSProperties;
  rowIndex: number;
  columnIndex: number;
}

const CellSkeleton = ({ rowIndex, columnIndex, style }: ICellSkeleton) => {
  const classes = useStyles({});
  const width = Number(style.width) || 0;

  return (
    <Cell
      className={classes.cell}
      rowIndex={rowIndex}
      columnIndex={columnIndex}
      style={style}
      selected={false}
      disabled={false}
      highligh={false}
    >
      <div className={classes.cellValue}>
        <Skeleton
          className={classes.skl}
          style={{
            height: 15,
            width: width - 30,
          }}
          animation="wave"
        />
      </div>
    </Cell>
  );
};

export default CellSkeleton;

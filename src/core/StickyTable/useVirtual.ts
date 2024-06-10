import { useMemo, useState, useRef, useEffect } from "react";

// https://github.com/bvaughn/react-window/blob/master/src/VariableSizeGrid.js See "findNearestItemBinarySearch". This
// is a binary search to find the index of the position to the left (or right) of an element at a given position. In
// other words, if we're scrolled to x, we need to know which element is the first to end after that position (that's
// our minimum).
const findNearestItem = (posIndexPairs, pos, left = true) => {
  let high = posIndexPairs.length;
  let low = 0;
  while (low <= high) {
    const middle = low + Math.floor((high - low) / 2);
    const currentOffset = posIndexPairs[middle];
    if (currentOffset === pos) {
      return middle;
    } else if (currentOffset < pos) {
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }
  if (low > 0) {
    return low - (left ? 1 : 0);
  } else {
    return 0;
  }
};

export interface IVirtual {
  rows: {
    visible: { min: number; max: number };
    sizes: number[];
    positions: number[];
  };
  cols: {
    visible: { min: number; max: number };
    sizes: number[];
    positions: number[];
  };
}

interface IUseVirtualResult {
  virtual: IVirtual;
  scrollX: number;
  scrollY: number;
  setScrollX: (n: number) => void;
  setScrollY: (n: number) => void;
  scrollW: number;
  scrollH: number;
  setScrollW: (n: number) => void;
  setScrollH: (n: number) => void;
}

interface IUseVittual {
  overscan: number;
  columnsCount: number;
  columnWidth: number | ((i: number) => number);
  width: number;
  rowsCount: number;
  rowHeight: number | ((i: number) => number);
  height: number;
}

// Mostly stolen from https://github.com/bvaughn/react-window
const useVirtual = ({
  overscan,
  columnsCount,
  columnWidth,
  width,
  rowsCount,
  rowHeight,
  height,
}: IUseVittual): IUseVirtualResult => {
  // This is a straight "if we've seen this scroll position before, use it" memo table. Since scroll positions are at
  // the pixel level, it seems unlikely we'd have a lot of hits. But if we do, they're stored here!
  const granularMemo = useRef({
    rows: {},
    cols: {},
  });

  // We compute ahead of time the sizes and positions of all our elements. It's a big up-front cost, but we can't risk
  // having to do it on-the-fly as they're scrolling.
  const [colSizes, colPositions] = useMemo(() => {
    // If any sizes or positions change, our granular memo table is invalidated
    granularMemo.current.cols = {};

    const isFunc = typeof columnWidth === "function";
    // First element is at position 0
    const positions = [0];
    const sizes = [isFunc ? columnWidth(0) : columnWidth];

    let last = 0;
    for (let i = 1; i < columnsCount; ++i) {
      // The position is the previous position plus the size of the last element.
      const point = last + sizes[i - 1];
      positions.push(point);
      last = point;
      sizes.push(isFunc ? columnWidth(i) : columnWidth);
    }

    return [sizes, positions];
  }, [columnsCount, columnWidth]);

  // Same as columns but rows
  const [rowSizes, rowPositions] = useMemo(() => {
    granularMemo.current.rows = {};
    const isFunc = typeof rowHeight === "function";
    const positions = [0];
    const sizes = [isFunc ? rowHeight(0) : rowHeight];

    let last = 0;
    for (let i = 1; i < rowsCount; ++i) {
      const point = last + sizes[i - 1];
      positions.push(point);
      last = point;
      sizes.push(isFunc ? rowHeight(i) : rowHeight);
    }

    return [sizes, positions];
  }, [rowsCount, rowHeight]);

  // If the overscan value changes, we don't need to recompute all the sizes/positions, but it still invalidates the
  // granular memo table.
  useEffect(() => {
    granularMemo.current = {
      rows: {},
      cols: {},
    };
  }, [overscan]);

  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollW, setScrollW] = useState(0);
  const [scrollH, setScrollH] = useState(0);

  let rows;
  let cols;

  if (granularMemo.current.rows[scrollY]) {
    rows = granularMemo.current.rows[scrollY];
  } else {
    rows = {
      min: Math.max(0, findNearestItem(rowPositions, scrollY, true) - overscan),
      max: Math.min(
        rowsCount - 1,
        findNearestItem(rowPositions, scrollY + height, false) + overscan,
      ),
    };
    granularMemo.current.rows[scrollY] = rows;
  }

  if (granularMemo.current.cols[scrollX]) {
    cols = granularMemo.current.cols[scrollX];
  } else {
    cols = {
      min: Math.max(0, findNearestItem(colPositions, scrollX, true) - overscan),
      max: Math.min(
        columnsCount - 1,
        findNearestItem(colPositions, scrollX + width, false) + overscan,
      ),
    };
    granularMemo.current.cols[scrollX] = cols;
  }

  return {
    virtual: {
      rows: {
        visible: rows,
        sizes: rowSizes,
        positions: rowPositions,
      },
      cols: {
        visible: cols,
        sizes: colSizes,
        positions: colPositions,
      },
    },
    scrollX,
    scrollY,
    setScrollX,
    setScrollY,
    scrollW,
    scrollH,
    setScrollW,
    setScrollH,
  };
};

export default useVirtual;

import * as React from "react";
import useScrollbarSizes from "./useScrollbarSizes";
import useVirtualize from "./useVirtual";
import TableGrid from "./TableGrid";
import TableHeaderRow from "./TableHeaderRow";
import TableHeaderCol from "./TableHeaderCol";
import Corner from "./Corner";
import { IStickyTable } from "./IStickyTable";
import BorderShadow from "../BorderShadow";
import { createUseStyles } from "react-jss";
import { getTheme } from "../../theme";

export const zIndexSticky = {
  rowsDisabledMask: 3,
  cols: 2,
  rows: 4,
  corner: 5,
  shadow: 6,
};

export const DEFAULT_WIDTH = 100;
export const DEFAULT_HEIGHT = 50;

const useStyles = createUseStyles({
  stickyTableOuter: {
    position: "relative",
    overflow: "hidden",
  },
  stickyTable: {
    position: "relative",
    overflow: "auto",
  },
  innerGrid: {
    position: "relative",
    overflow: "hidden",
    "& > *": {
      overflow: "hidden",
    },
  },
  stickyRow: {
    backgroundColor: getTheme().colors.background,
    position: "sticky",
    zIndex: zIndexSticky.rows,
  },
  stickyCol: {
    backgroundColor: getTheme().colors.background,
    position: "sticky",
    zIndex: zIndexSticky.cols,
  },
});

// Basic cell renderer. If someone wants to provide a custom function but only wants to change it slightly from the
// default, they can use a wrapper around this.
export const basicRenderer = ({ data, style, className }) => (
  <div style={style} className={className} children={data} />
);

export const StickyTable = ({
  topData,
  rightData,
  bottomData,
  leftData,
  width,
  height,
  topHeight = DEFAULT_HEIGHT,
  rightWidth = DEFAULT_WIDTH,
  bottomHeight = DEFAULT_HEIGHT,
  leftWidth = DEFAULT_WIDTH,
  columns,
  columnWidth = DEFAULT_WIDTH,
  rows,
  rowsCount,
  rowsIndexDisabled = [],
  rowsIndexHighligh = [],
  rowsIndexSelected = [],
  rowHeight = DEFAULT_HEIGHT,
  CellRenderer = basicRenderer,
  TopRenderer = basicRenderer,
  RightRenderer = basicRenderer,
  BottomRenderer = basicRenderer,
  LeftRenderer = basicRenderer,
  TopLeftRender = Corner,
  TopRightRender = Corner,
  BottomLeftRender = Corner,
  BottomRightRender = Corner,
  overscan = 5,
  children,
  resetScrollbarX = 0,
  resetScrollbarY = 0,
}: IStickyTable) => {
  // This goes on the outermost div. We just use it for the scrollbar hook.
  const classes = useStyles({});
  const containerRef = React.useRef();
  const scrollbarSizes = useScrollbarSizes(containerRef);

  if (!topData) {
    topHeight = 0;
  }
  if (!rightData) {
    rightWidth = 0;
  }
  if (!bottomData) {
    bottomHeight = 0;
  }
  if (!leftData) {
    leftWidth = 0;
  }

  const columnsCount = columns.length;

  // Size of the actual grid. The grid table will need to have these dimensions. Because we have custom size functions,
  // we have to iterate over the entire data object and aggregate the dimensions. For large data sets this can be
  // expensive. This only needs to be re-computed when the sizes or data change, so memoize!
  const [contentWidth, contentHeight] = React.useMemo(() => {
    let width = 0;
    let height = 0;
    if (typeof columnWidth === "function") {
      for (let i = 0; i < columnsCount; ++i) {
        width += columnWidth(i);
      }
    } else {
      width = columnWidth * columnsCount;
    }

    if (typeof rowHeight === "function") {
      for (let i = 0; i < rowsCount; ++i) {
        height += rowHeight(i);
      }
    } else {
      height = rowHeight * rowsCount;
    }
    return [width, height];
  }, [columnWidth, rowHeight, columnsCount, rowsCount]);

  // Size of the grid plus all the headers. The containing div will need to have these dimensions
  const totalWidth = leftWidth + rightWidth + contentWidth;
  const totalHeight = topHeight + bottomHeight + contentHeight;

  let viewWidth, viewHeight, hasVertScroll, hasHorizScroll;
  // If the size of the interior table is greater than its view, there will be scroll bars. Additionally, the box will
  // be the full size of the view. If the interior is smaller than the view, there are no scroll bars and we want the
  // view to only be as big as the interior. If the interior plus scroll bars is greater than the outside, just include
  // them.
  if (totalWidth + scrollbarSizes.width > width) {
    hasHorizScroll = true;
    viewWidth = width;
  } else {
    hasHorizScroll = false;
    viewWidth = totalWidth;
  }
  if (totalHeight + scrollbarSizes.height > height) {
    hasVertScroll = true;
    viewHeight = height;
  } else {
    hasVertScroll = false;
    viewHeight = totalHeight;
  }

  // The position from the left things like the right table/border/corners will be. This will be the size of the view
  // minus the size of the right header.
  let rightLeftPos = viewWidth - rightWidth;
  let bottomTopPos = viewHeight - bottomHeight;

  // If there are scroll bars, we're going to need to tweak some sizing and positioning.
  if (hasVertScroll || hasHorizScroll) {
    // If there are scroll bars on both sides, we need to move all our headers, corners, and fake borders over the size
    // of the scroll bars. If there is only one scroll bar, the side that doesn't have one is smaller than the box. Thus
    // the view was shrunk to only be the full size of the content. However, that content is now being pushed a little
    // by the scroll bar in the other direction, requiring us to scroll that tiny amount. So expand that width
    if (hasVertScroll && hasHorizScroll) {
      rightLeftPos -= Math.max(scrollbarSizes.width, width - viewWidth);
      bottomTopPos -= scrollbarSizes.height;
    } else if (hasVertScroll) {
      viewWidth += scrollbarSizes.width;
    } else {
      viewHeight += scrollbarSizes.height;
    }
  }

  // Given all relevant data, get virtual information. This includes
  // - Minimum and maximum rows/columns that must be rendered to populate the viewable box (the ranges that, if you're
  //   looking at an element outside that range, you don't have to render it).
  // - Dimensions of elements
  // - Absolute positions of elements
  // In order to get the virtualization (min/max) information, we have to compute the positions, and in order to compute
  // the positions, we need the sizes. Thus, we just handle and return all this information so we don't have to repeat
  // the work. This takes overscanning into account. Since this is the only thing that is hooking into the scroll
  // events on the div, we provide our own setters and keep the state internally.
  const {
    virtual,
    scrollX,
    scrollY,
    setScrollX,
    setScrollY,
    scrollW,
    scrollH,
    setScrollW,
    setScrollH,
  } = useVirtualize({
    overscan,
    columnsCount,
    columnWidth,
    rowsCount,
    rowHeight,
    width: viewWidth - leftWidth - rightWidth,
    height: viewHeight - topHeight - bottomHeight,
  });

  const cbScroll = React.useCallback(
    (e) => {
      setScrollX(e.target.scrollLeft);
      setScrollY(e.target.scrollTop);
      setScrollW(e.target.scrollWidth);
      setScrollH(e.target.scrollHeight);
    },
    [setScrollH, setScrollW, setScrollX, setScrollY],
  );

  const scrollbarRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!!resetScrollbarX) {
      scrollbarRef.current.scrollLeft = 0;
      setScrollX(0);
    }
  }, [resetScrollbarX, setScrollX]);
  React.useEffect(() => {
    if (!!resetScrollbarY) {
      scrollbarRef.current.scrollTop = 0;
      setScrollY(0);
    }
  }, [resetScrollbarY, setScrollY]);

  return (
    <div
      ref={containerRef}
      className={classes.stickyTableOuter}
      style={{
        width,
        height,
      }}
    >
      <BorderShadow
        open={!!leftData && scrollX > 0}
        position="left"
        style={{ zIndex: zIndexSticky.shadow, left: leftWidth }}
      />
      <BorderShadow
        open={!!rightData && Math.abs(scrollW - width - scrollX) > 1}
        position="right"
        style={{ zIndex: zIndexSticky.shadow, right: rightWidth }}
      />
      <BorderShadow
        open={!!topData && scrollY > 0}
        position="top"
        style={{ zIndex: zIndexSticky.shadow, top: topHeight }}
      />
      <BorderShadow
        open={!!bottomData && Math.abs(scrollH - height - scrollY) > 1}
        position="bottom"
        style={{ zIndex: zIndexSticky.shadow, bottom: bottomHeight }}
      />
      <div
        className={classes.stickyTable}
        ref={scrollbarRef}
        style={{
          width,
          height: viewHeight,
        }}
        onScroll={cbScroll}
      >
        {topData && leftData && (
          <TopLeftRender
            zIndex={zIndexSticky.corner}
            width={leftWidth}
            height={topHeight}
            top={0}
            left={0}
          />
        )}
        {bottomData && leftData && (
          <BottomLeftRender
            zIndex={zIndexSticky.corner}
            width={leftWidth}
            height={bottomHeight}
            top={bottomTopPos}
            left={0}
          />
        )}
        {topData && rightData && (
          <TopRightRender
            zIndex={zIndexSticky.corner}
            width={rightWidth}
            height={topHeight}
            top={0}
            left={rightLeftPos}
          />
        )}
        {bottomData && rightData && (
          <BottomRightRender
            zIndex={zIndexSticky.corner}
            width={rightWidth}
            height={bottomHeight}
            top={bottomTopPos}
            left={rightLeftPos}
          />
        )}
        {topData && (
          <TableHeaderRow
            data={topData}
            className={classes.stickyRow}
            style={{ top: 0 }}
            leftWidth={leftWidth}
            height={topHeight}
            columns={columns}
            virtual={virtual}
            renderer={TopRenderer}
          />
        )}
        {leftData && (
          <TableHeaderCol
            data={leftData}
            className={classes.stickyCol}
            style={{ left: 0 }}
            width={leftWidth}
            virtual={virtual}
            renderer={LeftRenderer}
            rowsIndexSelected={rowsIndexSelected}
            rowsIndexDisabled={rowsIndexDisabled}
            rowsIndexHighligh={rowsIndexHighligh}
          />
        )}
        {rightData && (
          <TableHeaderCol
            data={rightData}
            className={classes.stickyCol}
            style={{ right: 0 }}
            left={rightLeftPos}
            width={rightWidth}
            virtual={virtual}
            renderer={RightRenderer}
            rowsIndexSelected={rowsIndexSelected}
            rowsIndexDisabled={rowsIndexDisabled}
            rowsIndexHighligh={rowsIndexHighligh}
          />
        )}
        {bottomData && (
          <TableHeaderRow
            data={bottomData}
            className={classes.stickyRow}
            style={{ bottom: 0 }}
            top={bottomTopPos}
            leftWidth={leftWidth}
            height={bottomHeight}
            columns={columns}
            virtual={virtual}
            renderer={BottomRenderer}
          />
        )}
        <div
          className={classes.innerGrid}
          style={{
            width: contentWidth + rightWidth,
            maxWidth: contentWidth + rightWidth,
            height: contentHeight,
            maxHeight: contentHeight,
            top: -bottomHeight,
            left: leftWidth,
          }}
        >
          {children}
          <TableGrid
            data={rows}
            columns={columns}
            virtual={virtual}
            renderer={CellRenderer}
            rowsIndexSelected={rowsIndexSelected}
            rowsIndexDisabled={rowsIndexDisabled}
            rowsIndexHighligh={rowsIndexHighligh}
          />
        </div>
      </div>
    </div>
  );
};

export default StickyTable;

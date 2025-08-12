import * as React from "react";
import Placeholder from "../../core/Placeholder";
import PlaceholderError from "../../core/PlaceholderError";
import { zIndexSticky } from "../../core/StickyTable";

const zIndex = zIndexSticky.shadow + 1;

interface IGridPlaceholder {
  rowCount: number;
  columnCount: number;
  rootLoading: boolean;
  rootError: boolean;
  override?: JSX.Element | React.ReactNode;
}

const GridPlaceholder = ({
  rowCount,
  columnCount,
  rootLoading,
  rootError,
  override,
}: IGridPlaceholder) => {
  if (!!override) return <>{override}</>;

  if (rootError) {
    return (
      <PlaceholderError
        zIndex={zIndex}
        messages={[
          "The error could be related to the last filtering or the last sorting applied.",
          "Please modify the filters or the sorting.",
        ]}
      />
    );
  }
  if (rootLoading)
    return <Placeholder zIndex={zIndex} spinner background={!!rowCount} />;
  if (!columnCount)
    return <Placeholder zIndex={zIndex} icon="view_column" label="No column" />;
  if (!rowCount)
    return <Placeholder zIndex={zIndex} icon="search" label="No item found" />;

  return null;
};

export default GridPlaceholder;

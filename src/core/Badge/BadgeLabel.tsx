import * as React from "react";
import Text from "../Text";

interface IBadgeLabel {
  style?: React.CSSProperties;
  className?: string;
  label: string;
  labelRequired: boolean;
}

const BadgeLabel = ({
  style,
  className,
  label,
  labelRequired,
}: IBadgeLabel) => {
  if (!label) return null;
  return (
    <Text
      ellipsis
      weight="bolder"
      className={className}
      style={style}
      children={
        <>
          <span children={label} />
          {!labelRequired ? null : (
            <span style={{ color: "#f00" }} children="*" />
          )}
        </>
      }
    />
  );
};

export default BadgeLabel;

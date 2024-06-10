import * as React from "react";

export interface IFieldLabel {
  label: string | JSX.Element;
  mandatory?: boolean;
}

const FieldLabel = ({ label, mandatory }: IFieldLabel) => (
  <>
    {label}
    {!mandatory ? null : (
      <span
        style={{
          color: "#ff0000",
          marginLeft: 2,
        }}
        children={"*"}
      />
    )}
  </>
);

export default FieldLabel;

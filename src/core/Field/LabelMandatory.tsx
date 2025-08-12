export interface ILabelMandatory {
  label: string | JSX.Element;
  mandatory?: boolean;
}

const LabelMandatory = ({ label, mandatory }: ILabelMandatory) => (
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

export default LabelMandatory;

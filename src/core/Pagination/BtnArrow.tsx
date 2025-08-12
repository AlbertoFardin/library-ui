import Btn from "../Btn";

interface IBtnArrow {
  disabled: boolean;
  icon: string;
  onClick: () => void;
}

const BtnArrow = ({ disabled, icon, onClick }: IBtnArrow) => (
  <Btn icon={icon} disabled={disabled} onClick={onClick} small />
);

export default BtnArrow;

import * as React from "react";
import DeleteModal, { IDeleteModalCopy } from "../Modal/DeleteModal";
import { getTheme } from "../../theme";
import Btn from "../../core/Btn";

const DeleteBtn = ({
  className,
  style,
  copy,
  onDelete,
  disabled,
}: {
  className?: string;
  style?: React.CSSProperties;
  copy: IDeleteModalCopy;
  onDelete: () => void;
  disabled: boolean;
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpenModal = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleCancel = React.useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Btn
        className={className}
        style={style}
        variant="bold"
        label={copy.deleteBtn}
        onClick={handleOpenModal}
        color={getTheme().colors.msgFail}
        disabled={disabled}
      />
      {open && (
        <DeleteModal copy={copy} onDelete={onDelete} onCancel={handleCancel} />
      )}
    </>
  );
};
export default DeleteBtn;

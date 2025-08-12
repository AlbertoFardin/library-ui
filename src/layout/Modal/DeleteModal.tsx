import * as React from "react";
import Modal from "../../core/Modal";
import Text from "../../core/Text";
import Btn from "../../core/Btn";
import { getTheme } from "../../theme";

export interface IDeleteModalCopy {
  title: string;
  description?: string;
  cancelBtn?: string;
  deleteBtn?: string;
}

const DeleteModal = ({
  copy,
  onDelete,
  onCancel,
  open = true,
}: {
  copy: IDeleteModalCopy;
  onDelete: () => void;
  onCancel: () => void;
  open?: boolean;
}) => {
  const handleCancel = React.useCallback(() => {
    onCancel();
  }, [onCancel]);

  const handleDelete = React.useCallback(() => {
    onDelete();
  }, [onDelete]);

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      title={copy.title}
      content={
        <>
          {copy.description && (
            <Text style={{ marginBottom: 5 }} children={copy.description} />
          )}
        </>
      }
      actions={
        <>
          <div style={{ flex: 1 }} />
          <Btn
            variant="bold"
            label={copy.cancelBtn ?? "CANCEL"}
            onClick={handleCancel}
          />
          <Btn
            variant="bold"
            label={copy.deleteBtn ?? "DELETE"}
            color={getTheme().colors.msgFail}
            onClick={handleDelete}
          />
        </>
      }
    />
  );
};

export default DeleteModal;

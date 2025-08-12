import { IPwdMngCopy } from "./types";

export const DEFAULT_VALUE = "";
export const DEFAULT_COPY: IPwdMngCopy = {
  title: "Set Password",
  description:
    "By setting a password, it’ll be required to access this sharepage.",
  placeholder: "Insert password",
  btnSetPwd: "SET PASSWORD",
  btnModify: "EDIT",
  btnDelete: "DELETE",
  btnUpdate: "UPDATE",
  btnCancel: "CANCEL",
  modalDelete: {
    title: "Delete Share Page Password",
    description:
      "Deleting the current password will allow free access to this Share Page.",
    cancelBtn: "CANCEL",
    deleteBtn: "DELETE",
  },
};

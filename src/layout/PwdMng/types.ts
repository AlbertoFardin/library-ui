import { IPwdPolicy } from "../Login/utils/validatePassword";
import { IDeleteModalCopy } from "../Modal/DeleteModal";

export interface IPwdMngCopy {
  title: string;
  description: string;
  placeholder: string;
  btnSetPwd: string;
  btnModify: string;
  btnDelete: string;
  btnUpdate: string;
  btnCancel: string;
  modalDelete: IDeleteModalCopy;
}

export interface IPwdMng {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  value?: string;
  onChange: (pwd: string) => void;
  onCopyToClipboard?: (pwd: string) => void;
  required?: boolean;
  copy?: IPwdMngCopy;
  policy?: IPwdPolicy;
  loading?: boolean;
  readOnly?: boolean;
}

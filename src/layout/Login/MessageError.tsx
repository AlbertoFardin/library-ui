import { getTheme } from "../../theme";
import Text from "../../core/Text";
import getErrorMsg from "../../utils/getErrorMsg";
import { Initialize } from "../../interfaces";

export const getErrors = async (err): Promise<string[]> => {
  if (Array.isArray(err)) return err;
  const msg = await getErrorMsg(err);
  return [msg];
};

interface IMessageError {
  init: Initialize;
  messagesSucc: string[];
  messagesFail: string[];
}

const MessageError = ({ init, messagesSucc, messagesFail }: IMessageError) => {
  if (init === Initialize.SUCC) {
    return messagesSucc.map((p, i) => (
      <Text key={i} style={{ color: getTheme().colors.msgSucc }} children={p} />
    ));
  }
  if (init === Initialize.FAIL) {
    return messagesFail.map((p, i) => (
      <Text key={i} style={{ color: getTheme().colors.msgFail }} children={p} />
    ));
  }
  return <Text style={{ opacity: 0 }} children="_" />;
};

const MessageErrorWithMargin = (p: IMessageError) => (
  <>
    <div style={{ margin: 5 }} />
    <MessageError {...p} />
  </>
);

export default MessageErrorWithMargin;

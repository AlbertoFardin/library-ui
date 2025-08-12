import * as React from "react";
import PwdMng from ".";
import Btn from "../../core/Btn";
import Divider from "../../core/Divider";
import { IPwdPolicy } from "../Login/utils/validatePassword";

const pwdPolicy: IPwdPolicy = {
  minimumLength: 3,
  requireLowercase: false,
  requireUppercase: false,
  requireNumbers: false,
  requireSymbols: false,
};

const Demo = () => {
  const [value, setValue] = React.useState("ASDasd1@");
  const [loading, setLoading] = React.useState(false);
  const handleChange = React.useCallback((pwd: string) => {
    console.log(`set pwd with value "${pwd}"`);
    setValue(pwd);
  }, []);
  const handleCopyPassword = React.useCallback((pwd: string) => {
    console.log(`Copy pwd "${pwd}" to clipobard.`);
  }, []);
  const onBtnSet1 = React.useCallback(() => {
    setValue("VFR$5tgb");
    setLoading(false);
  }, []);
  const onBtnSet2 = React.useCallback(() => {
    setValue("ciaoCIAO1@");
    setLoading(false);
  }, []);
  const onBtnClear = React.useCallback(() => {
    setValue("");
    setLoading(false);
  }, []);
  const onBtnLoading = React.useCallback(() => {
    setLoading(true);
  }, []);

  return (
    <div style={{ margin: 15 }}>
      <PwdMng
        required={false}
        loading={loading}
        policy={pwdPolicy}
        value={value}
        onChange={handleChange}
        onCopyToClipboard={handleCopyPassword}
      />
      <Divider style={{ margin: 15 }} />
      <Btn variant="outlined" label="Set1" onClick={onBtnSet1} />
      <Btn variant="outlined" label="Set2" onClick={onBtnSet2} />
      <Btn variant="outlined" label="Clear" onClick={onBtnClear} />
      <Btn variant="outlined" label="LOADING" onClick={onBtnLoading} />
    </div>
  );
};

export default Demo;

import * as React from "react";
import { useAppCookiesCtx } from "../AppCookiesContext";
import { IRequestTokenResponse } from "../../AppUsersContext/interfaces";

export interface IUseKeepAliveAuthToken {
  requestTokenWithRefreshToken: () => Promise<IRequestTokenResponse>;
  onSuccessRefresh?: () => Promise<void>;
  onFailedRefresh?: () => Promise<void>;
  checkPeriod?: number;
  preventiveRefresh?: boolean;
}

const TOKEN_REFRESH_TIME_ESTIMATE = 500;

const doNothing = async () => {};

const useKeepAliveAuthToken = ({
  requestTokenWithRefreshToken,
  onSuccessRefresh = doNothing,
  onFailedRefresh = doNothing,
  checkPeriod = 500,
  preventiveRefresh = true,
}: IUseKeepAliveAuthToken): void => {
  const [refreshToken, setRefreshToken] = React.useState(false);
  const [logout, setLogout] = React.useState(false);
  const authCookiesHelper = useAppCookiesCtx().getAuthCookiesHelper();

  const performCheck = React.useCallback(() => {
    if (!logout && !authCookiesHelper.isRefreshTokenPresent()) {
      console.log("[RefreshToken] refresh token has expired.");
      setLogout(true);
    } else if (
      !refreshToken &&
      authCookiesHelper.shouldIdTokenBeRefreshed(
        preventiveRefresh
          ? checkPeriod + TOKEN_REFRESH_TIME_ESTIMATE
          : undefined,
      )
    ) {
      console.log("[authorizationToken] id token must be regenerated.");
      setRefreshToken(true);
    }
  }, [logout, refreshToken, preventiveRefresh, checkPeriod, authCookiesHelper]);

  React.useEffect(() => {
    if (logout) {
      (async () => {
        await onFailedRefresh();
        setLogout(false);
      })();
    }
  }, [logout, onFailedRefresh]);

  React.useEffect(() => {
    if (refreshToken) {
      (async () => {
        try {
          const refToken = await requestTokenWithRefreshToken();
          if (refToken.status >= 400) throw refToken;
          setRefreshToken(false);
          console.log("[authorizationToken] obtained and saved");
          await onSuccessRefresh();
        } catch (err) {
          console.log("[authorizationToken] error");
          await onFailedRefresh();
        }
      })();
    }
  }, [
    refreshToken,
    requestTokenWithRefreshToken,
    onSuccessRefresh,
    onFailedRefresh,
  ]);

  React.useEffect(() => {
    const interval = setInterval(performCheck, checkPeriod);
    return () => clearInterval(interval);
  }, [checkPeriod, performCheck]);

  React.useEffect(() => {
    window.addEventListener("focus", performCheck);
    return () => window.removeEventListener("focus", performCheck);
  }, [performCheck]);
};

export default useKeepAliveAuthToken;

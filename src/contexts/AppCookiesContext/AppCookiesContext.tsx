import * as React from "react";
import { IAuthCookiesHelper, IAppCookiesContext } from "./interfaces";

const AppCookiesContext = React.createContext<IAppCookiesContext | undefined>(
  undefined,
);

export const useAppCookiesCtx = (throwOnError: boolean = true) => {
  const context = React.useContext(AppCookiesContext);
  if (throwOnError && context === undefined) {
    throw new Error("useAppCookies must be used within an AppCookiesProvider");
  }
  return context;
};

interface IAppCookiesProvider {
  children: React.ReactNode;
  authCookiesHelper: IAuthCookiesHelper;
}

export const AppCookiesProvider: React.FC<IAppCookiesProvider> = ({
  children,
  authCookiesHelper,
}) => {
  const value = React.useMemo(
    (): IAppCookiesContext => ({
      getAuthCookiesHelper: () => authCookiesHelper,
    }),
    [authCookiesHelper],
  );

  return <AppCookiesContext.Provider value={value} children={children} />;
};

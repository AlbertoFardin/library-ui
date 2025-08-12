import * as React from "react";
import { IAppHelper, IAppHelperContext } from "./interfaces";
import { CACHE_BUST } from "./constantLocalStorage";
import { localstorageGetItem, localstorageSetItem } from "../../localstorage";

const AppHelperContext = React.createContext<IAppHelperContext | undefined>(
  undefined,
);

export const useAppHelperCtx = (throwOnError: boolean = true) => {
  const context = React.useContext(AppHelperContext);
  if (throwOnError && context === undefined) {
    throw new Error("useAppHelperCtx must be used within an AppHelperProvider");
  }
  return context;
};

export interface IAppHelperProvider {
  children: React.ReactNode;
  appHelper: IAppHelper;
}

const regenerateCacheBust = (): string => {
  const cacheBust = Date.now().toString();
  localstorageSetItem(CACHE_BUST, cacheBust);
  return cacheBust;
};

const getCacheBust = (): string => {
  return localstorageGetItem(CACHE_BUST) || regenerateCacheBust();
};

export const AppHelperProvider: React.FC<IAppHelperProvider> = ({
  children,
  appHelper,
}) => {
  const value = React.useMemo(
    (): IAppHelperContext => ({
      regenerateCacheBust,
      getCacheBust,
      getAppHelper: () => appHelper,
    }),
    [appHelper],
  );
  return <AppHelperContext.Provider value={value} children={children} />;
};

import * as React from "react";
import { IAppUsersContext, IUsersHelper } from "./interfaces";
import intLogin from "./userFunctions/login";
import intLogout from "./userFunctions/logout";
import intRefresh from "./userFunctions/refresh";
import intSwitchTenant from "./userFunctions/switchTenant";

const AppUsersContext = React.createContext<IAppUsersContext | undefined>(
  undefined,
);

export const useAppUsersCtx = (throwOnError: boolean = true) => {
  const context = React.useContext(AppUsersContext);
  if (throwOnError && context === undefined) {
    throw new Error("useAppUsersCtx must be used within an AppUsersProvider");
  }
  return context;
};

interface IAppUsersProvider {
  children: React.ReactNode;
  usersHelper: IUsersHelper;
}

export const AppUsersProvider: React.FC<IAppUsersProvider> = ({
  children,
  usersHelper,
}) => {
  const login = React.useCallback(
    async ({
      username,
      password,
      tenantId,
      onSuccess,
    }: {
      username: string;
      password: string;
      tenantId?: string;
      onSuccess?: () => void;
    }) => {
      return intLogin({
        usersHelper,
        username,
        password,
        tenantId,
        onSuccess,
      });
    },
    [usersHelper],
  );
  const logout = React.useCallback(
    async ({
      onSuccess,
      onFailure,
    }: {
      onSuccess?: () => void;
      onFailure?: () => void;
    }) => {
      intLogout({
        usersHelper,
        onSuccess,
        onFailure,
      });
    },
    [usersHelper],
  );
  const refresh = React.useCallback(
    async ({
      userId,
      groupId,
      tenantId,
    }: {
      userId: string;
      groupId: string;
      tenantId: string;
    }) => {
      intRefresh({
        usersHelper,
        userId,
        groupId,
        tenantId,
      });
    },
    [usersHelper],
  );
  const switchTenant = React.useCallback(
    async ({
      tenantId,
      onSuccess,
    }: {
      tenantId: string;
      onSuccess?: () => void;
    }) => {
      intSwitchTenant({
        usersHelper,
        tenantId,
        onSuccess,
      });
    },
    [usersHelper],
  );
  const value = React.useMemo(
    (): IAppUsersContext => ({
      usersHelper,
      login,
      logout,
      refresh,
      switchTenant,
    }),
    [usersHelper, login, logout, refresh, switchTenant],
  );
  return <AppUsersContext.Provider value={value} children={children} />;
};

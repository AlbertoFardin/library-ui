import * as React from "react";
import { GROUP_ID, TENANT_ID, USER_ID } from "./constantLocalStorage";
import {
  localstorageGetItem,
  localstorageSetItem,
  localstorageRemoveItem,
} from "../../localstorage";

const AppUserDataContext = React.createContext<
  IAppUserDataContextProps | undefined
>(undefined);

export const useAppUserDataCtx = (throwOnError: boolean = true) => {
  const context = React.useContext(AppUserDataContext);
  if (throwOnError && context === undefined) {
    throw new Error("useUserDataCtx must be used within a UserDataProvider");
  }
  return context;
};

export interface IUserData {
  userId: string;
  groupId: string;
  tenantId: string;
}

export const retrieveUserData = (): IUserData => {
  return {
    userId: localstorageGetItem(storageKeys.userId),
    groupId: localstorageGetItem(storageKeys.groupId),
    tenantId: localstorageGetItem(storageKeys.tenantId),
  };
};

type AppUserDataState = IUserData | null;

const storageKeys = {
  userId: USER_ID,
  groupId: GROUP_ID,
  tenantId: TENANT_ID,
};

export interface IAppUserDataContextProps {
  getUserId: () => string;
  getGroupId: () => string;
  getTenantId: () => string;
  setTenantId: (tenantId: string) => void;
  saveUserData: (data: Partial<IUserData>) => void;
  removeUserData: () => void;
}

type AppUserDataAction =
  | { type: "SET_TENANT_ID"; tenantId: string }
  | { type: "SAVE_USER_DATA"; payload: Partial<IUserData> }
  | { type: "REMOVE_USER_DATA" };

function appUserDataReducer(
  state: AppUserDataState,
  action: AppUserDataAction,
): AppUserDataState {
  switch (action.type) {
    case "SET_TENANT_ID":
      localstorageSetItem(storageKeys.tenantId, action.tenantId);
      return { ...state, tenantId: action.tenantId };
    case "SAVE_USER_DATA":
      const newState = { ...state, ...action.payload };
      Object.entries(action.payload).forEach(([key, value]) => {
        if (value !== undefined) {
          const storageKey = storageKeys[key as keyof typeof storageKeys];
          if (storageKey) {
            localstorageSetItem(storageKey, value);
          }
        }
      });
      return newState;
    case "REMOVE_USER_DATA":
      Object.values(storageKeys).forEach((key) => {
        localstorageRemoveItem(key);
      });
      return null;
    default:
      return state;
  }
}

const getInitialAppUserData = (): AppUserDataState => {
  return {
    userId: localstorageGetItem(storageKeys.userId),
    groupId: localstorageGetItem(storageKeys.groupId),
    tenantId: localstorageGetItem(storageKeys.tenantId),
  };
};

export interface IAppUserDataProvider {
  children: React.ReactNode;
}

export const AppUserDataProvider: React.FC<IAppUserDataProvider> = ({
  children,
}) => {
  const [userData, dispatch] = React.useReducer(
    appUserDataReducer,
    getInitialAppUserData(),
  );
  const value = React.useMemo(
    (): IAppUserDataContextProps => ({
      getUserId: () => {
        return userData?.userId;
      },
      getGroupId: () => {
        return userData?.groupId;
      },
      getTenantId: () => {
        return userData?.tenantId;
      },
      setTenantId: (tenantId: string) => {
        dispatch({ type: "SET_TENANT_ID", tenantId });
      },
      saveUserData: (data: Partial<IUserData>) => {
        dispatch({ type: "SAVE_USER_DATA", payload: data });
      },
      removeUserData: () => {
        dispatch({ type: "REMOVE_USER_DATA" });
      },
    }),
    [userData],
  );

  return <AppUserDataContext.Provider value={value} children={children} />;
};

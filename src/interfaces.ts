export const missingKey = "N/A";
export const DATE_FORMAT = "DD/MM/YYYY";

export enum Initialize {
  NONE = "NONE",
  START = "START",
  LOADING = "LOADING",
  SUCC = "SUCC",
  FAIL = "FAIL",
}

export enum ISortOrder {
  ASC = "ASC",
  DESC = "DESC",
  NONE = "NONE",
}

export interface ISort {
  id: string;
  type?: "string" | "number";
  label: string;
  order: ISortOrder;
  keyword?: boolean;
}

export enum Service {
  DA = "digitalassets",
  SC = "seecommerce",
  USERS = "users",
  ARCHIVER = "archiver",
  NOTIFIER = "notifier",
  DASHBOARD = "dashboard",
  MCM = "mcm",
}

export enum NotificationType {
  DEFAULT = "default",
  MENTION_IMG_SC = "MENTION_IMG_SC",
  MENTION_IMG_DA = "MENTION_IMG_DA",
  ASSIGNMENT = "ASSIGNMENT",
  IMPORT = "IMPORT",
  EXPORT = "EXPORT",
  MEDIA_LIBRARY = "MEDIA_LIBRARY",
  MEDIA_LIBRARY_CONFIG = "MEDIA_LIBRARY_CONFIG",
  PRODUCT = "PRODUCT",
  CONFIGURATION = "CONFIGURATION",
  ARCHIVING = "ARCHIVING",
  CDN_STATUS = "CDN_STATUS",
  DELETE_MEDIA_CONTENT = "DELETE_MEDIA_CONTENT",
  SHARED_FILES = "SHARED_FILES",
  MULTI_PRODUCT_EDITING = "MULTI_PRODUCT_EDITING",
  FILE_PUBLICATION_SUCCESS = "FILE_PUBLICATION_SUCCESS",
  FILE_PUBLICATION_FAIL = "FILE_PUBLICATION_FAIL",
  FILE_UNPUBLICATION_SUCCESS = "FILE_UNPUBLICATION_SUCCESS",
  FILE_UNPUBLICATION_FAIL = "FILE_UNPUBLICATION_FAIL",
  FILE_COPYRIGHT_UPDATED = "FILE_COPYRIGHT_UPDATED",
  MEDIA_CONF_UPDATE = "MediaConfigurationUpdate",
  MEDIA_ATTR_UPDATE = "MediaAttributesSetsMassive",
}

export interface IWsNotification {
  connetionUUID: string;
  application: string;
  service: Service;
  notificationType: NotificationType;
  isError: boolean;
  tenantId: string;
  user: string;
  payload;
}

export interface IWsCallbackViewport {
  id: string;
  callback: (
    itemsWs: IWsNotification[],
    dispatch: React.Dispatch<unknown>,
  ) => void;
}

export enum Severity {
  DEFAULT = "default",
  SUCC = "success",
  WARN = "warning",
  FAIL = "error",
  INFO = "info",
}

export interface IM2m {
  clientId: string;
  name: string;
  sub: string;
  permissions?: string[];
}

export interface IUser {
  userId: string;
  sub: string;
  profileData: {
    activated?: boolean;
    firstName: string;
    lastName: string;
    picture?: string;
    createdAt?: string;
    updatedAt?: string;
    email?: string;
    isWarda: boolean;
  };
  groupId?: string;
  tenantId?: string;
  tenants?: {
    tenantId: string;
    label: string;
    status: TenantStatus;
  }[];
  roles?: IRole[];
  applications?: string[];
  permissions?: { applicationId: string; permissions: string[] }[];
}

export enum TenantStatus {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export interface IRole {
  roleId: string;
  roleLabel: string;
}

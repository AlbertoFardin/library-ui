export enum Initialize {
  NONE = "NONE",
  START = "START",
  WAIT = "WAIT",
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
  SHAREPAGE = "share-page",
  MCM = "mcm",
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

export interface IMngItem<T> {
  id: string;
  version: number;
  ownerId: string;
  created: number;
  updated: number;
  payload: T;
  shareType?: ShareType;
}

export enum Condition {
  AND = "AND",
  OR = "OR",
}

export enum ShareType {
  PRIVATE = "PRIVATE",
  SHARE_UPD = "SHARE_UPD",
  SHARE_OBS = "SHARE_OBS",
}

export enum FileType {
  FOLDER = "FOLDER",
  MEDIA = "MEDIA",
  PORTAL = "PORTAL",
}

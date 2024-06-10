import { IUser, IM2m } from "../interfaces";

export enum IUserType {
  M2M = "M2M",
  USER = "USER",
  MOCK = "MOCK",
}

export interface IUserMock {
  type: IUserType;
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  avatar: string;
  avatarIcon: string;
  avatarText: string;
}

export const getUserInitials = (user: IUser): string => {
  const init =
    (user.profileData.firstName || "").substring(0, 1) +
    (user.profileData.lastName || "").substring(0, 1);
  return init.trim().toLocaleUpperCase();
};
export const getUserFullname = (user: IUser): string => {
  const f = user.profileData.firstName || "";
  const l = user.profileData.lastName || "";
  return f + (!!f ? " " : "") + l;
};

export const getUser = (
  id: string,
  users: IUser[],
  m2ms?: IM2m[],
): IUserMock => {
  const user = users.find((u) => u.userId === id);
  if (user) {
    return {
      type: IUserType.USER,
      id: user.userId,
      name: getUserFullname(user),
      firstName: user.profileData.firstName,
      lastName: user.profileData.lastName,
      avatar: user.profileData.picture,
      avatarIcon: "person",
      avatarText: getUserInitials(user),
    };
  }
  const m2m = (m2ms || []).find((u) => u.clientId === id);
  if (m2m) {
    return {
      type: IUserType.M2M,
      id,
      name: m2m.name,
      firstName: "",
      lastName: "",
      avatar: "",
      avatarIcon: "keyboard_command",
      avatarText: "",
    };
  }
  return {
    type: IUserType.MOCK,
    id,
    name: "Unknown User",
    firstName: "",
    lastName: "",
    avatar: "",
    avatarIcon: "person_outline",
    avatarText: "",
  };
};

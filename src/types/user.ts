// ⚠️ Thứ tự xuất hiện của enum Role quan trọng, phải theo thứ tự sắp xếp của data Role dưới DB.
import { BaseEntity } from "types/index";

export enum Role {
  Admin,
  Manager,
  Employee,
  Other,
}

export type Guid = string;

export interface User extends BaseEntity {
  // userID: number;
  // identifier: string;
  userFullName: string;
  userLastName: string;
  role: Role;
  avatarUrl: string;
  userPhoneNumber: string;
  email?: string;
}

export interface AuthUser {
  id: number;
  identifier: string;
  name: string;
  role: Role;
  avatarUrl: string;
}

export interface ChangePwRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

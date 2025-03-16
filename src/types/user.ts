// ⚠️ Thứ tự xuất hiện của enum Role quan trọng, phải theo thứ tự sắp xếp của enum Role dưới backend.
import { BaseEntity } from "@/types/index";

export enum Role {
  Admin,
  Manager,
  Employee,
}

export interface User extends BaseEntity {
  userID: string;
  userFullName: string;
  userLastName: string;
  role: Role;
  avatarUrl: string;
  userPhoneNumber: string;
  email?: string;
}

export interface ChangePwRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

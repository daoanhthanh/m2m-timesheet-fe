// ⚠️ Thứ tự xuất hiện của enum Role quan trọng, phải theo thứ tự sắp xếp của enum Role dưới backend.
import { BaseEntity } from "@/domains";

export enum Role {
  Admin,
  Manager,
  Employee,
}

export default interface User extends BaseEntity {
  userID: string;
  userFullName: string;
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

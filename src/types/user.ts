// ⚠️ Thứ tự xuất hiện của enum Role quan trọng, phải theo thứ tự sắp xếp của data Role dưới DB.
import { AuditEntity } from "types/index";

export enum Role {
  Admin,
  Manager,
  Employee,
}

export enum Gender {
  Male,
  Female,
  Other,
}

export interface User extends AuditEntity {
  accountId: string;
  name: string;
  phoneNumber: string;
  gender: Gender;
  email: string;
  addressId?: number;
  address?: any;
  dateOfBirth?: Date;
  taxCode?: string;
  role: Role;
  note?: string;
  hireDate: Date;
  departmentId?: number;
  department?: any;
  managerId?: string;
  positionId?: number;
  salary: number;
}

export interface Position {
  id: number;
  name: string;
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

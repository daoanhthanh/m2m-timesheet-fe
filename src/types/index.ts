export * from "./paid-leave-remainder";
export * from "./timesheet";
export * from "./user";
export * from "./form";
export * from "./form-builder";

export type Scalars = {
  DateTime: string;
  Date: string;
};

export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

export interface ErrorResponse {
  message: string;
  name: string;
}

export interface AuditEntity {
  id: string;
  createdAt: Date;
  createdBy: string; // user id, using string to prevent JS floating point limitation
  updatedAt: Date;
  updatedBy: string; // user id, using string to prevent JS floating point limitation
  isActive: boolean;
}

export interface Pagination<T> {
  data: T[];
  total: number;
}

export interface BaseResponse<T> {
  data?: T;
  success: boolean;
  error?: string;
}

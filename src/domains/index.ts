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

export interface BaseEntity {
  id: string;
  createdAt: "2024-06-05T03:02:40.008456";
  createdBy: string; // user id, using string to prevent JS floating point limitation
  updatedAt: "2024-06-09T04:32:23.203081";
  updatedBy: string; // user id, using string to prevent JS floating point limitation
  isDeleted: boolean;
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

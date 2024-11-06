import type { Dayjs } from "dayjs";

export type LeaveStatus = "approved" | "rejected" | "pending";

export interface LeaveRequest {
  leaveTime: number;
  leaveReason: string;
  leaveStatus: LeaveStatus;
}

export interface Timeslot {
  isCompleted: boolean;
  totalHours: number;
  actualCheckInTime: Dayjs;
  actualCheckOutTime: Dayjs;
  leaveRequest?: LeaveRequest;
}

export interface Timesheet {
  [key: string]: Timeslot;
}

export interface LeaveRequestForm {
  leaveDate: string;
  leaveReason: string;
  startLeaveTime: string;
  endLeaveTime: string;
  contactPhoneNumber: string;
}

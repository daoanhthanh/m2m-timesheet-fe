import type { Dayjs } from "dayjs";

export type LeaveStatus = "APPROVED" | "REJECTED" | "PENDING";

export interface LeaveRequest {
  leaveTime: number;
  leaveReason: string;
  leaveStatus: LeaveStatus;
}

export interface TimeslotByDay {
  isCompleted: boolean;
  totalHours: number;
  actualCheckInTime: Dayjs;
  actualCheckOutTime: Dayjs;
  leaveRequest?: LeaveRequest;
}

export type TimesheetByDay = Map<string, TimeslotByDay>;

export interface TimeslotByMonth {
  totalWorkingHours: number;
  totalLeaveHours: number;
}

export type TimesheetByMonth = Map<string, TimeslotByMonth>;

export interface LeaveRequestForm {
  leaveDate: string;
  leaveReason: string;
  startLeaveTime: string;
  endLeaveTime: string;
  contactPhoneNumber: string;
}

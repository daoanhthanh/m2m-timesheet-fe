import type { Dayjs } from "dayjs";
import { Scalars } from "@/domains";

export type LeaveStatus = "APPROVED" | "REJECTED" | "PENDING";

export interface LeaveRequest {
  id: number;
  leaveDate: Scalars["Date"];
  leaveHour: number;
  leaveReason: string;
  leaveStatus: LeaveStatus;
}

export interface TimeslotByDay {
  isCompleted: boolean;
  totalHours: number;
  actualCheckInTime: Scalars["DateTime"];
  actualCheckOutTime: Scalars["DateTime"];
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

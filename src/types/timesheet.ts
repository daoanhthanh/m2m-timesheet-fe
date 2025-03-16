export type LeaveType =
  | "ANNUAL_LEAVE"
  | "PERSONAL_LEAVE"
  | "SPECIAL_LEAVE"
  | "MATERNITY_LEAVE"
  | "WEDDING_LEAVE"
  | "BEREAVEMENT_LEAVE"
  | "COMPENSATORY_LEAVE";

export interface AvailableLeaveType {
  type: LeaveType;
  label: string;
  description?: string;
}

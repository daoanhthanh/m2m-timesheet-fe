import { User, Role } from "types";
import { AnnualLeaveRemainder, AvailableLeaveType } from "types";
import { GetOneResponse } from "@refinedev/core";

export const fakeUser: User = {
  id: "1",
  userID: "admin",
  userFullName: "Admin",
  userLastName: "Admin",
  role: Role.Admin,
  avatarUrl: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
  userPhoneNumber: "0123456789",
  email: "daoanhthanh.work@gmail.com",
  createdAt: "2024-06-05T03:02:40.008456",
  createdBy: "",
  isDeleted: false,
  updatedAt: "2024-06-09T04:32:23.203081",
  updatedBy: "",
};

export const fakeAnnualLeaveRemainder: GetOneResponse<AnnualLeaveRemainder> = {
  data: {
    userID: "1",
    totalAnnualLeaveHours: 80,
    remainingAnnualLeaveHours: 60,
    remainingSpecialLeaveHours: 6,
    totalSpecialLeaveHours: 12,
    year: 2025,
  },
};

export const fakeAvailableLeaveTypes: AvailableLeaveType[] = [
  {
    type: "ANNUAL_LEAVE",
    label: "Nghỉ phép năm 2025",
    description: "Còn 60/80 giờ",
  },
  {
    type: "PERSONAL_LEAVE",
    label: "Nghỉ việc không hưởng lương",
  },
  {
    type: "MATERNITY_LEAVE",
    label: "Nghỉ thai sản",
    description: "Áp dụng cho nhân viên nữ sinh con",
  },
  {
    type: "WEDDING_LEAVE",
    label: "Nghỉ cưới",
    description: "Khi bản thân tổ chức lễ cưới",
  },
  {
    type: "BEREAVEMENT_LEAVE",
    label: "Nghỉ hiếu",
    description: "Tang cha/mẹ, vợ/chồng, con, a/c/e ruột...",
  },
  {
    type: "COMPENSATORY_LEAVE",
    label: "Nghỉ bù",
    description: "Cho những ngày làm thêm giờ trước đó",
  },
];

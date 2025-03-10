import User, { Role } from "@/domains/user/user";
import { AnnualLeaveRemainder } from "@/domains";
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

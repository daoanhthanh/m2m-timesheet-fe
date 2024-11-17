import { LeaveStatus } from "@/domains/calendar";
import { PresetColorKey } from "antd/es/theme/interface/presetColors";

const getBadgeColorFromLRStatus = (status?: LeaveStatus): PresetColorKey => {
  switch (status) {
    case "PENDING":
      return "purple";
    case "APPROVED":
      return "green";
    case "REJECTED":
      return "red";
    default:
      return "purple";
  }
};
export default getBadgeColorFromLRStatus;

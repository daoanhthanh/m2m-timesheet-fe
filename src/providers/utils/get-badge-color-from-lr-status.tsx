import { LeaveStatus } from "@/domains/calendar";
import { PresetColorKey } from "antd/es/theme/interface/presetColors";
import { SyncOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";

export const getBadgeColorFromLRStatus = (
  status?: LeaveStatus,
): PresetColorKey => {
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

export const getBadgeIconFromLRStatus = (status?: LeaveStatus) => {
  switch (status) {
    case "PENDING":
      return <SyncOutlined spin />;
    case "APPROVED":
      return <CheckOutlined />;
    case "REJECTED":
      return <CloseOutlined />;
    default:
      return <SyncOutlined spin />;
  }
};

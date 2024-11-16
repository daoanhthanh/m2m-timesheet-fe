import {
  ClockCircleOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ResourceProps } from "@refinedev/core";

const resources: ResourceProps[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Trang chủ",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "timesheets",
    list: "/timesheets",
    create: "/timesheets/create-leave-request",
    show: "/timesheets/show/:id",
    edit: "/timesheets/edit/:id",
    meta: {
      label: "Chấm công",
      icon: <ClockCircleOutlined />,
      // canDelete: true,
    },
  },
  {
    name: "employees",
    list: "/employees",
    create: "/employees/create",
    show: "/employees/show/:id",
    edit: "/employees/edit/:id",
    meta: {
      label: "Nhân viên",
      icon: <UserOutlined />,
      // canDelete: true,
    },
  },
];

export default resources;

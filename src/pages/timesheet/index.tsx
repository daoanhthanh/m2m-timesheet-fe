import { usePermissions } from "@refinedev/core";
import { Role } from "@/domains/user/user";
import AdminTimesheetTable from "@/pages/timesheet/components/admin";
import EmployeeTimesheetTable from "@/pages/timesheet/components/employee";

const TimesheetTablePage = () => {
  const { data: role } = usePermissions();

  switch (role) {
    case Role.Admin:
      return <AdminTimesheetTable />;
    case Role.Manager:
      return <div>Manager Dashboard</div>;
    default:
      return <EmployeeTimesheetTable />;
  }
};

export default TimesheetTablePage;

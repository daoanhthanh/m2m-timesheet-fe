import { Alert, Table } from "antd";
import TimeAndEmployeeSelector from "@/pages/timesheet/components/admin/time-and-employee-selector";

interface IData {
  key: number;
  month: string;
  total: string;
  expected: string;
  isHours: string;
  year: number;
  monthIndex: number;
  [key: string]: string | number;
}
// Define the columns for the table
const columns = [
  {
    title: "Tháng",
    dataIndex: "month",
    key: "month",
    ellipsis: true,
    fixed: true,
  },
  {
    title: "Tổng công",
    dataIndex: "total",
    key: "total",
    fixed: true,
  },
  {
    title: "Nghỉ có phép",
    dataIndex: "expected",
    key: "expected",
  },
  {
    title: "Nghỉ không lương",
    dataIndex: "isHours",
    key: "isHours",
  },
  // Add columns for each day of the month
  ...Array.from({ length: 31 }, (_, dayIndex) => {
    const day = dayIndex + 1; // Day of the month (1-31)
    return {
      title: day < 10 ? `0${day}` : `${day}`,
      dataIndex: `day${day}`,
      key: `day${day}`,
      render: (text: string, record: IData) => {
        // Calculate the actual date
        const date = new Date(record.year, record.monthIndex, day);
        // Check if the day is a weekend
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        return {
          props: {
            style: { background: isWeekend ? "#dbdbdb" : "" },
          },
          children: <div>{text}</div>,
        };
      },
    };
  }),
];

// Generate data for the table, including year and monthIndex for date calculations
const data: IData[] = Array.from({ length: 12 }, (_, monthIndex) => {
  const monthName = new Date(0, monthIndex).toLocaleString("vi-VN", {
    month: "long",
  });
  return {
    key: monthIndex,
    month: monthName,
    total: "0:00",
    expected: "0:00",
    isHours: "0:00",
    year: new Date().getFullYear(), // Assuming the current year
    monthIndex, // Store the month index for date calculations,
    // Generate random data for each day of the month
    ...Array.from({ length: 31 }, (_, dayIndex) => {
      const hours = Math.floor(Math.random() * 8);
      const minutes = Math.floor(Math.random() * 60);
      return {
        [`day${dayIndex + 1}`]: `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`,
      };
    }).reduce((result, obj) => {
      return { ...result, ...obj };
    }, {}),
  };
});

const AdminTimesheetTable = () => {
  return (
    <div className={"page-container"}>
      <TimeAndEmployeeSelector />
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={true}
        // sticky={true}
        // scroll={{ y: `calc(100vh - 250px)` }}
        scroll={{
          x: true,
          // y: `calc(100vh - 50px)`,
        }}
      />
    </div>
  );
};

export default AdminTimesheetTable;

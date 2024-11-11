import {
  Calendar as ACalendar,
  CalendarProps as ACalendarProps,
  Col,
  Row,
} from "antd";
import { SelectInfo } from "antd/es/calendar/generateCalendar";
import type { Dayjs as TDayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import * as React from "react";
import CalendarCell from "pages/timesheet/components/calendar-cell";
import { useTranslation } from "react-i18next";
import {
  LeaveRequest,
  TimesheetByDay,
  TimeslotByDay,
} from "@/domains/calendar";
import { RecentLeaveRequestCard } from "@/pages/timesheet/components/recent-leave-request-card";
import AddRecordButton from "@/components/buttons/add-record-button";
import { CreateButton } from "@refinedev/antd";

export const TimesheetWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { t } = useTranslation();

  const [timeslots, setTimeslots] = React.useState<TimesheetByDay>(new Map());

  const onPanelChange = (
    value: TDayjs,
    mode: ACalendarProps<TDayjs>["mode"],
  ) => {
    console.log(JSON.stringify(value, null, 2), mode);
  };

  const [selectedDate, setSelectedDate] = React.useState<TDayjs>(dayjs());

  const onSelect = (date: TDayjs, selectInfo: SelectInfo) => {
    if (selectInfo.source === "date") {
      setSelectedDate(date);
    }
  };

  const cellRender = (date: TDayjs, info: CellRenderInfo<TDayjs>) => {
    const timeslot: TimeslotByDay = {
      isCompleted: true,
      totalHours: 8,
      actualCheckInTime: dayjs().format("HH:mm"),
      actualCheckOutTime: dayjs().add(9, "hour").format("HH:mm"),
      leaveRequest: {
        id: 1,
        leaveHour: 4,
        leaveReason: "flu",
        leaveStatus: "APPROVED",
        leaveDate: "",
      },
    };

    return <CalendarCell value={date} info={info} timeslot={timeslot} />;
  };

  const leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      leaveDate: "2024-11-11",
      leaveHour: 4,
      leaveReason: "flu",
      leaveStatus: "APPROVED",
    },
    {
      id: 2,
      leaveDate: "2024-11-12",
      leaveHour: 8,
      leaveReason: "flu",
      leaveStatus: "REJECTED",
    },
    {
      id: 3,
      leaveDate: "2024-11-13",
      leaveHour: 4,
      leaveReason: "flu",
      leaveStatus: "PENDING",
    },
    {
      id: 4,
      leaveDate: "2024-11-01",
      leaveHour: 3,
      leaveReason: "flu",
      leaveStatus: "APPROVED",
    },
  ];

  return (
    <div className="page-container">
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={6}>
          <AddRecordButton
            block
            className="mb-1"
            entity="timesheet"
            buttonText={t("timesheet.createLeaveRequest")}
            additionalQuery={{ targetDate: selectedDate.format("DD-MM-YYYY") }}
          />

          <RecentLeaveRequestCard
            cardProps={{ style: { marginBottom: "1rem" } }}
            data={leaveRequests}
          />
        </Col>
        <Col xs={24} xl={18}>
          <ACalendar
            onPanelChange={onPanelChange}
            onSelect={onSelect}
            fullCellRender={cellRender}
          />
        </Col>
      </Row>
      {children}
    </div>
  );
};

import { Calendar as ACalendar, CalendarProps as ACalendarProps } from "antd";
import { SelectInfo } from "antd/es/calendar/generateCalendar";
import type { Dayjs as TDayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import * as React from "react";
import CalendarCell from "pages/timesheet/components/calendar-cell";
import { useTranslation } from "react-i18next";
import { TimesheetByDay, TimeslotByDay } from "@/domains/calendar";
import AddRecordButton from "@/components/buttons/add-record-button";

export default function Calendar() {
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
      actualCheckInTime: dayjs(),
      actualCheckOutTime: dayjs().add(9, "hour"),
      leaveRequest: {
        leaveTime: 4,
        leaveReason: "flu",
        leaveStatus: "APPROVED",
      },
    };

    return <CalendarCell value={date} info={info} timeslot={timeslot} />;
  };

  return (
    <>
      <AddRecordButton
        className="mb-1.5"
        entity="timesheet"
        buttonText={t("timesheet.createLeaveRequest")}
        additionalQuery={{ targetDate: selectedDate.format("DD-MM-YYYY") }}
      />
      <ACalendar
        onPanelChange={onPanelChange}
        onSelect={onSelect}
        fullCellRender={cellRender}
      />
    </>
  );
}

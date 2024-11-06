import { Calendar as ACalendar, CalendarProps as ACalendarProps } from "antd";
import { SelectInfo } from "antd/es/calendar/generateCalendar";
import type { Dayjs as TDayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import * as React from "react";
import DateCell from "@/pages/timesheet/components/date-cell";
import { useTranslation } from "react-i18next";
import { Timeslot } from "@/domains/calendar";
import AddRecordButton from "@/components/buttons/add-record-button";

export default function Calendar() {
  const { t } = useTranslation();

  const onPanelChange = (
    value: TDayjs,
    mode: ACalendarProps<TDayjs>["mode"],
  ) => {};

  const [selectedDate, setSelectedDate] = React.useState<TDayjs>(dayjs());

  const onSelect = (date: TDayjs, selectInfo: SelectInfo) => {
    if (selectInfo.source === "date") {
      setSelectedDate(date);
    }
  };

  const cellRender = (date: TDayjs, info: CellRenderInfo<TDayjs>) => {
    const timeslot: Timeslot = {
      isCompleted: true,
      totalHours: 8,
      actualCheckInTime: dayjs(),
      actualCheckOutTime: dayjs().add(9, "hour"),
      leaveRequest: {
        leaveTime: 4,
        leaveReason: "flu",
        leaveStatus: "approved",
      },
    };

    return <DateCell value={date} timeslot={timeslot} />;
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

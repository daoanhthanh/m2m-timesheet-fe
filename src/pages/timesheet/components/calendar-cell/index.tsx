import React from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Badge, Popover } from "antd";
import { TimeslotByDay } from "@/domains/calendar";
import { useTranslation } from "react-i18next";
import "./index.scss";
import type { PresetStatusColorType } from "antd/es/_util/colors";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import getMonthName from "@/providers/month-list";
import { twMerge } from "tailwind-merge";
import useThemeMode from "@/hooks/useThemeMode";

export interface DateCellProps {
  value: Dayjs;
  info: CellRenderInfo<Dayjs>;
  timeslot: TimeslotByDay;
}

export default function CalendarCell({ value, info, timeslot }: DateCellProps) {
  const { t } = useTranslation();

  const themeMode = useThemeMode();

  const weekendBgColor = themeMode === "dark" ? "bg-[#78716C]" : "bg-slate-100";

  const popupTitle: string = `${t("timesheet.totalHours.full")}: ${timeslot.totalHours}`;

  const popupContent = (
    <div>
      <p className="mb-0">
        {t("timesheet.actualCheckIn")}:{" "}
        <span>{timeslot.actualCheckInTime}</span>
      </p>
      <p className="mb-0">
        {t("timesheet.actualCheckOut")}:{" "}
        <span>{timeslot.actualCheckOutTime}</span>
      </p>
      {timeslot.leaveRequest && (
        <>
          <p className="mb-0">
            {t("timesheet.leaveTime.full")}:{" "}
            <span>{timeslot.leaveRequest.leaveTime}</span>
          </p>
          <p className="mb-0">
            {t("timesheet.leaveReason")}:{" "}
            <span>{timeslot.leaveRequest.leaveReason}</span>
          </p>
          <p className="mb-0">
            {t("timesheet.leaveStatus")}:{" "}
            <span>{timeslot.leaveRequest.leaveStatus}</span>
          </p>
        </>
      )}
    </div>
  );

  const isWeekend = value.day() === 0 || value.day() === 6;

  const className = twMerge(
    "ant-picker-cell-inner ant-picker-calendar-date",
    value.isSame(dayjs(), "date") ? "ant-picker-calendar-date-today" : "",
    isWeekend ? weekendBgColor : "",
    "m-0",
  );

  const contentRender = () => {
    let content = [];
    if (!timeslot.isCompleted) {
      content.push(
        <Badge
          key={1}
          status="warning"
          text={`${t("timesheet.totalHours.short")}: ${timeslot.totalHours}`}
        />,
      );
    }

    if (timeslot.leaveRequest) {
      let badgeStatus: PresetStatusColorType = "processing";
      switch (timeslot.leaveRequest.leaveStatus) {
        case "APPROVED":
          badgeStatus = "success";
          break;
        case "REJECTED":
          badgeStatus = "error";
          break;
      }

      content.push(
        <Badge
          key={2}
          status={badgeStatus}
          text={`${t("timesheet.leaveTime.short")}: ${timeslot.leaveRequest.leaveTime}`}
        />,
      );
    }

    return <div>{content}</div>;
  };

  return (
    <Popover content={popupContent} title={popupTitle} trigger="hover">
      <div className={className}>
        <div className="ant-picker-calendar-date-value">
          {info.type === "date"
            ? value.date()
            : getMonthName(info.locale!, value.month())}
        </div>
        <div className="ant-picker-calendar-date-content">
          {contentRender()}
        </div>
      </div>
    </Popover>
  );
}

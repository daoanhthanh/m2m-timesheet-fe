import React from "react";

import { useNavigation } from "@refinedev/core";

import { Badge } from "antd";

import { Text } from "@/components";
import dayjs from "@/providers/utils/date/viDayJS";

import styles from "./index.module.css";
import { LeaveRequest } from "@/domains/calendar";
import { useTranslation } from "react-i18next";

type CalendarUpcomingEventProps = {
  item: LeaveRequest;
};

export const CalendarUpcomingEvent: React.FC<CalendarUpcomingEventProps> = ({
  item,
}) => {
  const { show } = useNavigation();
  const { t } = useTranslation();
  const { id, leaveDate, leaveHour, leaveReason, leaveStatus } = item;

  const curDayjs = dayjs(leaveDate);
  const isToday = curDayjs.isToday();
  const isTomorrow = curDayjs.isSame(dayjs().add(1, "day"), "day");
  const isYesterday = curDayjs.isSame(dayjs().subtract(1, "day"), "day");
  const isAllDayEvent = leaveHour == 8;

  const renderDate = () => {
    if (isToday) {
      return t("common.today");
    }

    if (isTomorrow) {
      return t("common.tomorrow");
    }

    if (isYesterday) {
      return t("common.yesterday");
    }

    return dayjs(leaveDate).format("DD MMMM");
  };

  const renderTime = () => {
    if (isAllDayEvent) {
      return "Cả ngày";
    }

    return leaveHour + t("common.hour");
  };

  const color = () => {
    switch (leaveStatus) {
      case "PENDING":
        return "cyan";
      case "APPROVED":
        return "green";
      case "REJECTED":
        return "red";
      default:
        return "blue";
    }
  };

  // ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];

  return (
    <div
      onClick={() => {
        show("timesheet", item.id);
      }}
      key={id}
      className={styles.item}
    >
      <div className={styles.date}>
        <Badge color={color()} className={styles.badge} />
        <Text size="xs">{`${renderDate()}, ${renderTime()}`}</Text>
      </div>
      <Text ellipsis={{ tooltip: true }} strong className={styles.title}>
        {leaveReason}
      </Text>
    </div>
  );
};

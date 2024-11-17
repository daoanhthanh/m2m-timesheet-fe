import React from "react";

import { useNavigation } from "@refinedev/core";

import { Badge } from "antd";

import { Text } from "@/components";
import dayjs from "@/providers/utils/date/viDayJS";

import styles from "./index.module.css";
import { LeaveRequest } from "@/domains/calendar";
import { useTranslation } from "react-i18next";
import getBadgeColorFromLRStatus from "@/providers/utils/get-badge-color-from-lr-status";

type RecentLeaveRequestItemProps = {
  item: LeaveRequest;
  multipleYears?: boolean;
};

export const RecentLeaveRequestItem: React.FC<RecentLeaveRequestItemProps> = ({
  item,
  multipleYears,
}) => {
  const { show } = useNavigation();
  const { t } = useTranslation();
  const { id, leaveDate, leaveTime, leaveReason, leaveStatus } = item;

  const curDayjs = dayjs(leaveDate);
  const isToday = curDayjs.isToday();
  const isTomorrow = curDayjs.isSame(dayjs().add(1, "day"), "day");
  const isYesterday = curDayjs.isSame(dayjs().subtract(1, "day"), "day");
  const isAllDayEvent = leaveTime == 8;

  const dateFormat = multipleYears ? "DD MMMM, YYYY" : "DD MMMM";

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

    return dayjs(leaveDate).format(dateFormat);
  };

  const renderTime = () => {
    if (isAllDayEvent) {
      return "Cả ngày";
    }

    return leaveTime + t("common.hour");
  };

  const color = () => {
    switch (leaveStatus) {
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

  return (
    <div
      onClick={() => {
        show("timesheets", item.id);
      }}
      key={id}
      className={styles.item}
    >
      <div className="mb-1">
        <Badge
          color={getBadgeColorFromLRStatus(leaveStatus)}
          className="mr-4"
        />
        <Text size="xs">{`${renderDate()} | ${renderTime()}`}</Text>
      </div>
      <Text ellipsis={{ tooltip: true }} strong className={styles.title}>
        {leaveReason}
      </Text>
    </div>
  );
};

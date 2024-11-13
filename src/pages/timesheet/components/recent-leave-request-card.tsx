import { LeaveRequest } from "@/domains/calendar";
import React from "react";
import { Button, Card, CardProps, Skeleton } from "antd";
import { CalendarOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Text } from "@/components";
import { useCustom, useList, useNavigation } from "@refinedev/core";
import { CalendarUpcomingEvent } from "@/pages/timesheet/components/recent-leave-request";
import type { TFunction } from "i18next";

export type RecentLeaveRequestProps = {
  cardProps?: CardProps;
};

const NoEvent: React.FC<{ t: TFunction<"translation", undefined> }> = ({
  t,
}) => (
  <span
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "220px",
    }}
  >
    {t("timesheet.noRecentLeaveRequest")}
  </span>
);

export const RecentLeaveRequestCard: React.FC<RecentLeaveRequestProps> = ({
  cardProps,
}) => {
  const { t } = useTranslation();
  const { list } = useNavigation();

  // url,
  //   method,
  //   config,
  //   queryOptions,
  //   successNotification,
  //   errorNotification,
  //   meta,
  //   metaData,
  //   dataProviderName,
  //   overtimeOptions,

  const { data, isLoading } = useCustom<LeaveRequest>({
    url: "/timesheets/recent-leave-request",
    method: "get",
  });

  const _data: LeaveRequest[] = [
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
    <Card
      styles={{
        header: { padding: "8px 16px" },
        body: {
          padding: "0 1rem",
        },
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: ".7rem" }}>
            {t("timesheet.recentLeaveRequest")}
          </Text>
        </div>
      }
      {...cardProps}
    >
      {_data.map((item) => (
        <CalendarUpcomingEvent key={item.id} item={item} />
      ))}
      {_data.length === 0 && <NoEvent t={t} />}
    </Card>
  );
};

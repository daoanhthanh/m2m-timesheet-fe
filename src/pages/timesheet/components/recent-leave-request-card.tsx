import { LeaveRequest } from "@/domains/calendar";
import React from "react";
import { Button, Card, CardProps, Skeleton } from "antd";
import { CalendarOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Text } from "@/components";
import { useNavigation } from "@refinedev/core";
import { CalendarUpcomingEvent } from "@/pages/timesheet/components/recent-leave-request";
import type { TFunction } from "i18next";

export type RecentLeaveRequestProps = {
  data: LeaveRequest[];
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
  data,
  cardProps,
}) => {
  const { t } = useTranslation();
  const { list } = useNavigation();

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
      {data.map((item) => (
        <CalendarUpcomingEvent key={item.id} item={item} />
      ))}
      {data.length === 0 && <NoEvent t={t} />}
    </Card>
  );
};

import { LeaveRequest } from "@/domains/calendar";
import React from "react";
import { Card, CardProps, Skeleton, Tag } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Text } from "@/components";
import { useCustom } from "@refinedev/core";
import { RecentLeaveRequestItem } from "@/pages/timesheet/components/recent-leave-request-item";
import type { TFunction } from "i18next";
import { BaseResponse } from "@/domains";
import styles from "./index.module.css";

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

  const { data, isLoading } = useCustom<BaseResponse<LeaveRequest[]>>({
    url: "/timesheets/recent-leave-request",
    method: "get",
  });

  const leaveRequests = data?.data.data || [];

  const dataContainsDifferentYear: boolean = leaveRequests.some(
    (item) =>
      new Date(item.leaveDate).getFullYear() !== new Date().getFullYear(),
  );

  return (
    <div>
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
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div className={styles.item} key={index}>
              <Skeleton
                loading
                active
                paragraph={{
                  rows: 1,
                }}
                style={{
                  paddingBottom: "3px",
                }}
              />
            </div>
          ))
        ) : (
          <>
            {leaveRequests.map((item) => (
              <RecentLeaveRequestItem
                key={item.id}
                item={item}
                multipleYears={dataContainsDifferentYear}
              />
            ))}
            {leaveRequests.length === 0 && <NoEvent t={t} />}
          </>
        )}
      </Card>
      <div>
        <Tag color="purple">{t("timesheet.status.PENDING")}</Tag>
        <Tag color="green">{t("timesheet.status.APPROVED")}</Tag>
        <Tag color="red">{t("timesheet.status.REJECTED")}</Tag>
      </div>
    </div>
  );
};

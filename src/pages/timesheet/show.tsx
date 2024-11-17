import { Badge, Button, Drawer, Skeleton, Tag } from "antd";
import React from "react";
import { Text } from "@/components";
import { useNavigation, useShow } from "@refinedev/core";
import { LeaveRequest } from "@/domains/calendar";
import { EditButton } from "@refinedev/antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import getBadgeColorFromLRStatus from "@/providers/utils/get-badge-color-from-lr-status";
import dayjs from "dayjs";

export const LeaveRequestShow: React.FC = () => {
  const { query } = useShow<LeaveRequest>();
  const { data, isLoading } = query;
  const { list } = useNavigation();
  const record = data?.data;
  const { t } = useTranslation();

  const handleOnClose = () => {
    list("timesheets");
  };

  // if the event is more than one day, don't show the time
  let allDay = record?.leaveTime === 8;

  const drawerContent = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {allDay ? (
          <div>
            <CalendarOutlined style={{ marginRight: ".5rem" }} />
            <Text>{`${dayjs(record?.leaveDate).format("D MMMM")}`}</Text>
            <Tag style={{ marginLeft: ".5rem" }} color="blue">
              Cả ngày
            </Tag>
          </div>
        ) : (
          <>
            <div>
              <CalendarOutlined style={{ marginRight: ".5rem" }} />
              <Text>
                {dayjs(record?.leaveDate).format("dddd, DD MMMM, YYYY")}
              </Text>
            </div>
            <div>
              <ClockCircleOutlined style={{ marginRight: ".5rem" }} />
              <Text>
                {t("timesheet.leaveTime.full")}: {record?.leaveTime}
                {t("common.hour")}
              </Text>
            </div>
          </>
        )}
      </div>
    );
  };

  return isLoading ? (
    <Skeleton
      loading={isLoading}
      active
      avatar
      paragraph={{
        rows: 3,
      }}
      style={{
        padding: 0,
      }}
    />
  ) : (
    <Drawer
      title={
        <div className="flex justify-between items-center">
          <div style={{ display: "flex", gap: "8px" }}>
            {isLoading ? (
              <Skeleton
                loading={isLoading}
                active
                avatar
                paragraph={{
                  rows: 1,
                }}
                style={{
                  padding: 0,
                }}
              />
            ) : (
              <>
                <Badge
                  color={getBadgeColorFromLRStatus(record?.leaveStatus)}
                  className="mr-4"
                />
                <Text strong size="md">
                  {record?.leaveReason}
                </Text>
              </>
            )}
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <EditButton icon={<EditOutlined />} hideText type="text" />
            <Button
              icon={<CloseOutlined />}
              type="text"
              onClick={handleOnClose}
            />
          </div>
        </div>
      }
      closeIcon={false}
      open
      onClose={handleOnClose}
      width={378}
    >
      {isLoading ? (
        <Skeleton
          loading={isLoading}
          active
          avatar
          paragraph={{
            rows: 3,
          }}
          style={{
            padding: 0,
          }}
        />
      ) : (
        drawerContent()
      )}
    </Drawer>
  );
};

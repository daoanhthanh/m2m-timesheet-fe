import { Badge, Button, Drawer, Skeleton, Tag } from "antd";
import React from "react";
import { Text } from "@/components";
import { useNavigation, useShow } from "@refinedev/core";
import { LeaveRequest } from "@/domains/calendar";
import {
  CalendarOutlined,
  CalendarTwoTone,
  ClockCircleTwoTone,
  CloseOutlined,
  EditOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  getBadgeColorFromLRStatus,
  getBadgeIconFromLRStatus,
} from "@/providers/utils/get-badge-color-from-lr-status";
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
            <CalendarOutlined className="mr-2" />
            <Text>{`${dayjs(record?.leaveDate).format("D MMMM")}`}</Text>
            <Tag style={{ marginLeft: ".5rem" }} color="blue">
              {t("common.allDay")}
            </Tag>
          </div>
        ) : (
          <>
            <div>
              <CalendarTwoTone className="mr-2" />
              <Text>
                {dayjs(record?.leaveDate).format("dddd, DD MMMM, YYYY")}
              </Text>
            </div>
            <div>
              <ClockCircleTwoTone className="mr-2" />
              <Text>
                {t("timesheet.leaveTime.full")}: {record?.leaveTime}
                {t("common.hour")}
              </Text>
            </div>
            <div>
              <InfoCircleTwoTone className="mr-2" />
              <Text>{t("timesheet.leaveStatus")}:&nbsp;</Text>

              <Tag
                icon={getBadgeIconFromLRStatus(record?.leaveStatus)}
                color={getBadgeColorFromLRStatus(record?.leaveStatus)}
              >
                {t(`timesheet.status.${record?.leaveStatus}`)}
              </Tag>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <Drawer
      title={
        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-[8px] w-full">
            {isLoading ? (
              <Skeleton.Button
                className="mr-2"
                active={true}
                size={"small"}
                block={true}
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
            {/*<EditButton icon={<EditOutlined />} hideText type="text" />*/}
            <Button icon={<EditOutlined />} type="text" />
            {/*<EditOutlined />*/}
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
      width={"30rem"}
    >
      {isLoading ? (
        <Skeleton
          loading
          active
          title={false}
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

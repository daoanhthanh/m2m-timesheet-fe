import { Button, Drawer, Skeleton, Space, Tag } from "antd";
import React from "react";
import { Text } from "@/components";
import { useNavigation, useShow } from "@refinedev/core";
import { TimeslotByDay } from "@/domains/calendar";
import { EditButton } from "@refinedev/antd";
import { CloseOutlined, EditOutlined, FlagOutlined } from "@ant-design/icons";
import dayjs from "@/providers/utils/date/viDayJS";
import { toast } from "react-toastify";

export const TimesheetShow: React.FC = () => {
  const { query } = useShow<TimeslotByDay>({});
  const { data, isLoading } = query;
  const { list } = useNavigation();
  const record = data?.data;

  // if (!record) {
  //   toast.error("Không tìm thấy bản ghi");
  //   list("timesheets");
  //   return null;
  // }

  // const curDayjs = dayjs(record!.leaveRequest.leaveDate);
  // const isToday = curDayjs.isToday();
  // const isTomorrow = curDayjs.isSame(dayjs().add(1, "day"), "day");
  // const isYesterday = curDayjs.isSame(dayjs().subtract(1, "day"), "day");
  // const isAllDayEvent = leaveHour == 8;

  const handleOnClose = () => {
    list("timesheet");
  };

  return (
    <Drawer
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                // backgroundColor: data?.data.color,
                flexShrink: 0,
                borderRadius: "50%",
                width: "10px",
                height: "10px",
                marginTop: "8px",
              }}
            />
            <Text strong size="md">
              {record?.leaveRequest?.leaveReason}
            </Text>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/*  {allDay ? (*/}
          {/*    <div>*/}
          {/*      <CalendarOutlined style={{marginRight: ".5rem"}}/>*/}
          {/*      <Text>{`${dayjs(utcStartDate).format("D MMMM")} - ${dayjs(*/}
          {/*        utcEndDate,*/}
          {/*      ).format("D MMMM")}`}</Text>*/}
          {/*      <Tag style={{marginLeft: ".5rem"}} color="blue">*/}
          {/*        C? ng?y*/}
          {/*      </Tag>*/}
          {/*    </div>*/}
          {/*  ) : (*/}
          {/*    <>*/}
          {/*      <div>*/}
          {/*        <CalendarOutlined style={{marginRight: ".5rem"}}/>*/}
          {/*        <Text>{dayjs(utcStartDate).format("D MMMM, YYYY dddd")}</Text>*/}
          {/*      </div>*/}
          {/*      <div>*/}
          {/*        <ClockCircleOutlined style={{marginRight: ".5rem"}}/>*/}
          {/*        <Text>{`${dayjs(utcStartDate).format("h:mma")} - ${dayjs(*/}
          {/*          utcEndDate,*/}
          {/*        ).format("h:mma")}`}</Text>*/}
          {/*      </div>*/}
          {/*    </>*/}
          {/*  )}*/}

          {/*  <div>*/}
          {/*    <FlagOutlined style={{marginRight: ".5rem"}}/>*/}
          {/*    <Text>{category?.title}</Text>*/}
          {/*  </div>*/}
          {/*  <div style={{display: "flex", alignItems: "start"}}>*/}
          {/*    <TeamOutlined style={{marginRight: ".5rem"}}/>*/}
          {/*    <Space size={4} wrap style={{marginTop: "-8px"}}>*/}
          {/*      {participants?.map((participant) => (*/}
          {/*        <UserTag key={participant.id} user={participant}/>*/}
          {/*      ))}*/}
          {/*    </Space>*/}
          {/*  </div>*/}
          {/*  <div style={{display: "flex", alignItems: "start"}}>*/}
          {/*    <InfoCircleOutlined*/}
          {/*      style={{*/}
          {/*        marginRight: ".5rem",*/}
          {/*        marginTop: "0.32rem",*/}
          {/*      }}*/}
          {/*    />*/}
          {/*    <Text>{description}</Text>*/}
          {/*  </div>*/}
        </div>
      )}
    </Drawer>
  );
};

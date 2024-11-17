import { Button, Drawer, Skeleton } from "antd";
import React from "react";
import { Text } from "@/components";
import { useNavigation, useShow } from "@refinedev/core";
import { LeaveRequest } from "@/domains/calendar";
import { EditButton } from "@refinedev/antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

export const LeaveRequestShow: React.FC = () => {
  const { query } = useShow<LeaveRequest>();
  const { data, isLoading } = query;
  const { list } = useNavigation();
  const record = data?.data;

  const handleOnClose = () => {
    list("timesheets");
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
              {record?.leaveReason}
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
          <div>
            <Text strong>Ngày</Text>
            <Text>{record?.leaveDate}</Text>
          </div>
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

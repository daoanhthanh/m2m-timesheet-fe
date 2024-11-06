import { useForm } from "@refinedev/antd";

import { Button, Form, Input, Modal, TimePicker } from "antd";

import { useNavigation } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import { LeaveRequestForm } from "@/domains/calendar";
import dayjs, { type Dayjs } from "dayjs";
import React, { useState } from "react";

export const LeaveRequestCreate = () => {
  const { t } = useTranslation();
  const { formProps, saveButtonProps, queryResult, onFinish } =
    useForm<LeaveRequestForm>({
      redirect: "list",
    });

  const { list } = useNavigation();

  const [startLeaveTime, setStartLeaveTime] = useState<Dayjs>(dayjs());
  const [endLeaveTime, setEndLeaveTime] = useState<Dayjs>(startLeaveTime);
  const addTime = (amount: number) => {
    setEndLeaveTime(endLeaveTime.add(amount, "hour"));
    console.log("endLeaveTime", endLeaveTime.format("HH:mm"));
  };

  const updateTime = () => {
    return (
      <div>
        <Button className="mr-0.5 mb-0.5" onClick={() => addTime(1)}>
          +1 hour
        </Button>
        <Button className="mr-0.5 mb-0.5" onClick={() => addTime(2)}>
          +2 hours
        </Button>
        <Button className="mr-0.5 mb-0.5" onClick={() => addTime(3)}>
          +3 hours
        </Button>
        <Button className="mr-0.5 mb-0.5" onClick={() => addTime(5)}>
          +5 hours
        </Button>
        <Button className="mr-0.5 mb-0.5" onClick={() => addTime(8)}>
          All day
        </Button>
      </div>
    );
  };

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const dateFormatList = ["DD/MM/YYYY", "DD-MM-YYYY", "DDMMYYYY"];

  return (
    <Modal
      open
      title={t("timesheet.createLeaveRequest")}
      style={{ display: "inherit" }}
      onCancel={() => {
        list("timesheet");
      }}
      okText={t("common.save")}
      okButtonProps={{
        ...saveButtonProps,
      }}
      width={"45rem"}
    >
      <Form
        {...formLayout}
        {...formProps}
        onFinish={(values) => {
          // onFinish({
          //     ...values,
          // }).then((r) => {});

          console.log("values", values);
        }}
      >
        <Form.Item
          label={t("timesheet.leaveReason")}
          name="leaveReason"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>

        <Form.Item
          label={t("timesheet.startLeaveTime")}
          name="startLeaveTime"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TimePicker
            defaultValue={dayjs()}
            format={"HH:mm"}
            placeholder="HH:mm"
            onChange={(dayjsValue, _) => {
              dayjsValue == null
                ? setStartLeaveTime(dayjs())
                : setStartLeaveTime(dayjsValue);
            }}
          />
        </Form.Item>
        <Form.Item
          label={t("timesheet.endLeaveTime")}
          name="endLeaveTime"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {updateTime()}
          <TimePicker
            format={"HH:mm"}
            value={endLeaveTime}
            onChange={(dayjsValue, _) =>
              dayjsValue == null
                ? setEndLeaveTime(startLeaveTime)
                : setEndLeaveTime(dayjsValue)
            }
          />
        </Form.Item>
        <Form.Item label={t("common.phoneNumber")} name="contactPhoneNumber">
          <Input type="tel" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

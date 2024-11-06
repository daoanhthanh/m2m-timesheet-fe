import { useForm } from "@refinedev/antd";
import { Button, DatePicker, Form, Input, Modal, TimePicker } from "antd";
import { useNavigation } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import { LeaveRequestForm } from "@/domains/calendar";
import dayjs, { type Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const LeaveRequestCreate = () => {
  const { t } = useTranslation();
  const timeFormat = "HH:mm";
  const { form, formProps, saveButtonProps } = useForm<LeaveRequestForm>({
    redirect: "list",
  });
  const { list } = useNavigation();
  const [searchParams] = useSearchParams();
  const targetDate = searchParams.get("targetDate");

  const [startLeaveTime, setStartLeaveTime] = useState<Dayjs>(dayjs());
  const [endLeaveTime, setEndLeaveTime] = useState<Dayjs>(startLeaveTime);

  const addTime = (amount: number) => {
    setEndLeaveTime(endLeaveTime.add(amount, "hour"));
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

  useEffect(() => {
    form.setFieldsValue({ startLeaveTime });
    form.setFieldsValue({ endLeaveTime });
  }, [endLeaveTime, formProps.form]);

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
      {/*@ts-ignore*/}
      <Form
        {...formLayout}
        {...formProps}
        onFinish={(values: LeaveRequestForm) => {
          values.startLeaveTime = startLeaveTime.format("HH:mm");
          values.endLeaveTime = endLeaveTime.format("HH:mm");
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
          label={t("timesheet.leaveDate")}
          name="leaveDate"
          rules={[
            {
              required: true,
              message: t("timesheet.leaveDateRequired"),
            },
          ]}
        >
          <DatePicker
            placeholder={"DD-MM-YYYY"}
            defaultValue={dayjs(targetDate, "DD-MM-YYYY")}
            format={"DD-MM-YYYY"}
          />
        </Form.Item>

        <Form.Item
          label={t("timesheet.startLeaveTime")}
          name="startLeaveTime"
          rules={[
            {
              required: true,
              message: t("timesheet.startLeaveTimeRequired"),
            },
          ]}
        >
          <TimePicker
            defaultValue={dayjs()}
            defaultPickerValue={dayjs()}
            format={timeFormat}
            placeholder={timeFormat}
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
              message: t("timesheet.startLeaveTimeRequired"),
            },
          ]}
        >
          {updateTime()}
          <TimePicker
            format={timeFormat}
            placeholder={timeFormat}
            value={endLeaveTime}
            defaultPickerValue={startLeaveTime}
            onChange={(dayjsValue, _) =>
              dayjsValue == null
                ? setEndLeaveTime(startLeaveTime)
                : setEndLeaveTime(dayjsValue)
            }
          />
          <span>{endLeaveTime.diff(startLeaveTime, "hours")} giờ</span>
        </Form.Item>
        <Form.Item label={t("common.phoneNumber")} name="contactPhoneNumber">
          <Input type="tel" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

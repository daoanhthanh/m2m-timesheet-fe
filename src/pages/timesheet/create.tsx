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
  const dateFormat = "DD-MM-YYYY";
  const { form, formProps, saveButtonProps } = useForm<LeaveRequestForm>({
    redirect: "list",
  });
  const { list } = useNavigation();
  const [searchParams] = useSearchParams();
  const targetDate = searchParams.get("targetDate");

  const [startLeaveTime, setStartLeaveTime] = useState<Dayjs>(dayjs());
  const [endLeaveTime, setEndLeaveTime] = useState<Dayjs>(
    startLeaveTime.add(1, "hour"),
  );

  const addTime = (amount: number) => {
    setEndLeaveTime(endLeaveTime.add(amount, "hour"));
  };

  const updateTime = () => {
    return (
      <div>
        <Button className="mr-0.5 mb-0.5" onClick={() => addTime(1)}>
          +1 {t("common.hour")}
        </Button>
        <Button className="mr-0.5 mb-0.5" onClick={() => addTime(2)}>
          +2 {t("common.hours")}
        </Button>
        <Button className="mr-0.5 mb-0.5" onClick={() => addTime(3)}>
          +3 {t("common.hours")}
        </Button>
        <Button className="mr-0.5 mb-0.5" onClick={() => addTime(5)}>
          +5 {t("common.hours")}
        </Button>
        <Button className="mr-0.5 mb-0.5" onClick={() => addTime(8)}>
          {t("common.allDay")}
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
    form.setFieldsValue({ leaveDate: dayjs(targetDate, dateFormat) });
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
          values.leaveDate = dayjs(values.leaveDate).format(dateFormat);

          console.log("leaveRequestForm", JSON.stringify(values, null, 2));
        }}
      >
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
            placeholder={dateFormat}
            defaultValue={dayjs(targetDate, dateFormat)}
            format={dateFormat}
          />
        </Form.Item>

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
        </Form.Item>
        <Form.Item label={t("timesheet.leaveTime.full")}>
          <Input
            type="tel"
            style={{ color: "red" }}
            value={`${endLeaveTime.diff(startLeaveTime, "hours")} giờ`}
            disabled
            variant={"borderless"}
          />
        </Form.Item>
        <Form.Item label={t("common.phoneNumber")} name="contactPhoneNumber">
          <Input type="tel" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

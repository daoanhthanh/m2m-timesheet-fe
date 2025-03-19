import { useForm } from "@refinedev/antd";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import { useNavigation, useNotification } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import { LeaveRequestForm } from "types/calendar";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fakeAvailableLeaveTypes } from "providers/fake-provider-data";
import { calculateLeaveHour } from "services";

export const LeaveRequestCreate = () => {
  const { t } = useTranslation();
  const TIME_FORMAT = import.meta.env.VITE_TIME_FORMAT;
  const DATE_FORMAT = import.meta.env.VITE_DATE_FORMAT;
  const checkinHour = import.meta.env.VITE_CHECK_IN_HOUR;
  const checkinMinute = import.meta.env.VITE_CHECK_IN_MINUTE;
  const checkoutHour = import.meta.env.VITE_CHECK_OUT_HOUR;
  const checkoutMinute = import.meta.env.VITE_CHECK_OUT_MINUTE;

  const { open } = useNotification();

  const { formProps, saveButtonProps } = useForm<LeaveRequestForm>({
    redirect: "list",
  });

  const [leaveType, setLeaveType] = useState<string | undefined>(
    fakeAvailableLeaveTypes[0].type,
  );

  const [leaveRange, setLeaveRange] = useState<[Dayjs, Dayjs] | null>(null);

  const { list } = useNavigation();
  const [searchParams] = useSearchParams();
  let targetDate = searchParams.get("targetDate");

  const [startLeaveTime, setStartLeaveTime] = useState<Dayjs>(dayjs());
  const [endLeaveTime, setEndLeaveTime] = useState<Dayjs>(
    startLeaveTime.add(1, "hour"),
  );

  const addTime = (amount: number) => {
    setEndLeaveTime(endLeaveTime.add(amount, "hour"));
  };

  const displayTotalHours = (range: [Dayjs, Dayjs] | null): number => {
    if (!range) return 0;
    const [start, end] = range;

    try {
      return calculateLeaveHour(start, end);
    } catch (err) {
      return 0;
    }
  };

  const handleSubmit = (values: LeaveRequestForm) => {
    values.startLeaveTime = startLeaveTime.format(TIME_FORMAT);
    values.endLeaveTime = endLeaveTime.format(TIME_FORMAT);
    values.leaveDate = dayjs(values.leaveDate).format(DATE_FORMAT);

    console.log("leaveRequestForm", JSON.stringify(values, null, 2));

    open?.({
      type: "success",
      message: t("timesheet.form.success"),
    });
  };

  // const updateTime = () => {
  //     return (
  //         <div>
  //             <Button className="mr-0.5 mb-0.5" onClick={() => addTime(1)}>
  //                 +1{t("common.hour")}
  //             </Button>
  //             <Button className="mr-0.5 mb-0.5" onClick={() => addTime(2)}>
  //                 +2{t("common.hours")}
  //             </Button>
  //             <Button className="mr-0.5 mb-0.5" onClick={() => addTime(3)}>
  //                 +3{t("common.hours")}
  //             </Button>
  //             <Button className="mr-0.5 mb-0.5" onClick={() => addTime(5)}>
  //                 +5{t("common.hours")}
  //             </Button>
  //             <Button className="mr-0.5 mb-0.5" onClick={() => addTime(8)}>
  //                 {t("common.allDay")}
  //             </Button>
  //         </div>
  //     );
  // };

  const initialValues = {
    leaveDate: dayjs(targetDate, DATE_FORMAT)
      .hour(checkinHour)
      .minute(checkinMinute),
    startLeaveTime,
    endLeaveTime,
  };

  return (
    <Modal
      open
      title={t("timesheet.createLeaveRequest")}
      style={{ display: "inherit" }}
      onCancel={() => {
        list("timesheets");
      }}
      okText={t("common.save")}
      okButtonProps={{
        ...saveButtonProps,
      }}
      width={"45rem"}
    >
      {/*@ts-ignore*/}
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        {...formProps}
        initialValues={initialValues}
        onFinish={handleSubmit}
        className="space-y-4 pb-4"
      >
        <Form.Item
          label={t("timesheet.leaveType.full")}
          name="leaveType"
          rules={[
            {
              required: true,
              message: t("timesheet.leaveType.errMessage"),
            },
          ]}
        >
          <Select
            placeholder={t("timesheet.leaveType.placeholder")}
            onChange={setLeaveType}
            value={leaveType}
          >
            {fakeAvailableLeaveTypes.map((item) => (
              <Select.Option key={item.type} value={item.type}>
                {item.label}
                {item.description && ` (${item.description})`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={t("timesheet.leaveDate.full")}
          name="leaveDate"
          rules={[
            {
              required: true,
              validator: (_, value) => {
                if (!value?.[0] || !value?.[1]) {
                  return Promise.reject(
                    new Error(t("timesheet.leaveDate.errMessage1")),
                  );
                }
                const endTime = value[1] as Dayjs;
                const endOfWorkDay = endTime
                  .hour(checkoutHour)
                  .minute(checkoutMinute);
                if (endTime.isAfter(endOfWorkDay)) {
                  return Promise.reject(
                    new Error(
                      t("timesheet.leaveDate.errMessage2", {
                        checkoutHour,
                        checkoutMinute,
                      }),
                    ),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker.RangePicker
            disabledTime={() => {
              return {
                disabledHours: () => [
                  0, 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23,
                ], // Disable hours before 8am and after 5pm
              };
            }}
            showTime={{ format: TIME_FORMAT }}
            format={`${DATE_FORMAT} ${TIME_FORMAT}`}
            className="w-full"
            onChange={(values) => setLeaveRange(values as [Dayjs, Dayjs])}
          />
        </Form.Item>

        <Form.Item
          label={t("timesheet.leaveReason.full")}
          name="leaveReason"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 6 }}
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          label={t("timesheet.totalLeaveHours.full")}
          rules={[
            {
              pattern: /^(?!0$)(?!^$)[0-9]+$/,
              message: t("timesheet.totalLeaveHours.errMessage"),
            },
          ]}
        >
          <Input
            type="tel"
            style={{ color: "red" }}
            value={`${displayTotalHours(leaveRange)} giờ`}
            disabled
            className="w-full border-none"
          />
        </Form.Item>

        <Form.Item
          label={t("timesheet.contactPhoneNumber.full")}
          name="contactPhoneNumber"
          rules={[
            {
              pattern: /^(0[3|5|7|8|9])([0-9]{8})$/,
              message: t("timesheet.contactPhoneNumber.errMessage"),
            },
          ]}
        >
          <Input type="tel" className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

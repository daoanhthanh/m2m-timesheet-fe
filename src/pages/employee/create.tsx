import React, { useState } from "react";

import { useForm } from "@refinedev/antd";

import { DatePicker, Form, Input, Modal, Radio, RadioChangeEvent } from "antd";

import { useGetIdentity, useNavigation } from "@refinedev/core";
import User from "@/domains/user/user";

export const EmployeeCreate = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm<User>({
    redirect: "list",
  });

  const { data: currentLoginUser } = useGetIdentity<User>();

  const { list } = useNavigation();

  const [gender, setGender] = useState(1); // default is male
  const onChangeGender = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  const dateFormatList = ["DD/MM/YYYY", "DD-MM-YYYY", "DDMMYYYY"];

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      open
      title="Thêm nhân viên"
      style={{ display: "inherit" }}
      onCancel={() => {
        list("employees");
      }}
      okText="Thêm"
      okButtonProps={{
        ...saveButtonProps,
      }}
      width={"30rem"}
    >
      <Form
        {...formLayout}
        {...formProps}
        onFinish={(values) => {
          onFinish({
            ...values,
            salesOwnerId: currentLoginUser?.id,
          }).then((r) => {});
        }}
      >
        <Form.Item
          label="Họ tên"
          name="fullName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Sinh nhật"
          name="dob"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker placeholder={"DD/MM/YYYY"} format={dateFormatList} />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="userPhoneNumber">
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Giới tính" name="gender">
          <Radio.Group onChange={onChangeGender} value={gender}>
            <Radio value={1}>Nam</Radio>
            <Radio value={2}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Mã số thuế" name="taxCode">
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Hãy nhập địa chỉ email hợp lệ",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ghi chú" name="note">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

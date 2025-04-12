import React, { useState } from "react";

import { useForm } from "@refinedev/antd";

import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Switch,
  Tooltip,
} from "antd";

import { CopyOutlined, ReloadOutlined } from "@ant-design/icons";
import { useGetIdentity, useNavigation } from "@refinedev/core";
import { AuthUser, User } from "types/user";
import { useTranslation } from "react-i18next";
import { UploadAvatarButton } from "components/buttons";
import { copyToClipboard, generatePassword } from "utils/passwordUtils";

export const EmployeeCreate = () => {
  const { formProps, saveButtonProps, onFinish } = useForm<User>({
    redirect: "list",
  });

  const { t } = useTranslation();

  const { data: currentLoginUser } = useGetIdentity<AuthUser>();

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

  // const [sendEmail, setSendEmail] = useState(true);

  const handleRenewPassword = () => {
    const newPassword = generatePassword();
    formProps.form?.setFieldsValue({ password: newPassword });
  };

  const handleCopyPassword = () => {
    const password = formProps.form?.getFieldValue("password");
    copyToClipboard(password);
  };

  return (
    <Modal
      open
      title={t("employees.create.addBtn")}
      style={{ display: "inherit" }}
      onCancel={() => {
        list("employees");
      }}
      okText={t("employees.create.addAction")}
      okButtonProps={{
        ...saveButtonProps,
      }}
      width={"81rem"}
    >
      <Form
        {...formLayout}
        {...formProps}
        initialValues={{
          password: generatePassword(),
          sendEmail: true,
          gender: 1, // Male
          active: true,
          requestNewPassword: true,
        }}
        onFinish={(values) => {
          onFinish({
            ...values,
            createdBy: currentLoginUser?.id,
          }).then((r) => {});
        }}
      >
        <div className="flex gap-2">
          <div className="flex-1">
            <UploadAvatarButton className="m-4" />

            <Form.Item
              label={t("employees.create.fullName")}
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
              label={t("employees.create.dob")}
              name="dob"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker placeholder={"DD/MM/YYYY"} format={dateFormatList} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: t("employees.create.emailValidation"),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t("employees.create.phoneNumber")}
              name="userPhoneNumber"
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item label={t("employees.create.gender")} name="gender">
              <Radio.Group onChange={onChangeGender} value={gender}>
                <Radio value={1}>{t("employees.create.genderMale")}</Radio>
                <Radio value={2}>{t("employees.create.genderFemale")}</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label={t("employees.create.title")} name="title">
              <Input />
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item label={t("employees.create.password")} name="password">
              <Input
                readOnly
                addonAfter={
                  <div className="flex gap-2">
                    <Tooltip title={t("employees.create.refreshPassword")}>
                      <Button
                        size="small"
                        icon={<ReloadOutlined />}
                        onClick={handleRenewPassword}
                        type="text"
                      />
                    </Tooltip>
                    <Tooltip
                      placement={"bottom"}
                      title={t("employees.create.copyToClipboard")}
                    >
                      <Button
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={handleCopyPassword}
                        type="text"
                      />
                    </Tooltip>
                  </div>
                }
              />
            </Form.Item>

            <Form.Item
              label={t("employees.create.sendPWEmail")}
              name="sendEmail"
              valuePropName="checked"
            >
              <div className="flex items-start">
                <Switch
                  className="mt-[6px]"
                  defaultChecked
                  onChange={(checked) => {
                    formProps.form?.setFieldsValue({ sendEmail: checked });
                  }}
                />
                <span className="ml-2 text-gray-500">
                  {t("employees.create.sendPWEmailTooltip")}
                </span>
              </div>
            </Form.Item>

            <Form.Item label={t("employees.create.taxCode")} name="taxCode">
              <Input />
            </Form.Item>
            <Form.Item label={t("employees.create.note")} name="note">
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label={t("employees.create.active")}
              name="active"
              valuePropName="checked"
            >
              <div className="flex">
                <Switch
                  className="mt-[6px]"
                  defaultChecked
                  onChange={(checked) => {
                    formProps.form?.setFieldsValue({ active: checked });
                  }}
                />
                <span className="ml-2 text-gray-500">
                  {t("employees.create.activeTooltip")}
                </span>
              </div>
            </Form.Item>

            <Form.Item
              label={t("employees.create.requestNewPassword")}
              name="requestNewPassword"
              valuePropName="checked"
            >
              <div className="flex ">
                <Switch
                  className="mt-[6px]"
                  defaultChecked
                  onChange={(checked) => {
                    formProps.form?.setFieldsValue({
                      requestNewPassword: checked,
                    });
                  }}
                />
                <span className="ml-2 text-gray-500">
                  {t("employees.create.requestNewPasswordTooltip")}
                </span>
              </div>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

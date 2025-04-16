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
  Select,
  Switch,
  Tooltip,
} from "antd";

import { CopyOutlined, ReloadOutlined } from "@ant-design/icons";
import { useGetIdentity, useList, useNavigation } from "@refinedev/core";
import { AuthUser, Gender, User } from "types/user";
import { useTranslation } from "react-i18next";
import { UploadAvatarButton } from "components/buttons";
import { copyToClipboard, generatePassword } from "utils/passwordUtils";
import { DefaultOptionType as OptionType } from "rc-select/lib/Select";
import { endpoints } from "@/utils/endpoints";
import Avatar from "@/components/avatar";
import { roleData } from "@/providers/constants";

export const EmployeeCreate = () => {
  const { formProps, saveButtonProps, onFinish } = useForm<User>({
    redirect: "list",
  });

  const { t } = useTranslation();

  const { data: currentLoginUser } = useGetIdentity<AuthUser>();

  const { list } = useNavigation();

  const { data: managersData, isLoading } = useList({
    resource: "employees",
    filters: [
      {
        field: "role",
        operator: "eq",
        value: 1, // Manager role
      },
    ],
    queryOptions: {
      enabled: formProps.form?.getFieldValue("role") === 2, // Only fetch when role is Employee
    },
  });

  const managerOptions: OptionType[] =
    managersData?.data.map((manager) => ({
      value: manager.id,
      label: manager.name,
      data: manager, // Store full manager data for rendering
    })) || [];

  const [gender, setGender] = useState(1); // default is male
  const onChangeGender = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  const dateFormatList = ["DD/MM/YYYY", "DD-MM-YYYY", "DDMMYYYY"];

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

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
          gender: Gender.Male,
          active: true,
          requestNewPassword: true,
          role: roleData[2].value,
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
            <Form.Item
              label={t("employees.create.avatar")}
              name="base64AvatarTempPath"
            >
              <UploadAvatarButton
                onUploadSuccess={(file) => {
                  formProps.form?.setFieldsValue({
                    base64AvatarTempPath: file.response.data.atp,
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              label={t("employees.create.fullName")}
              name="name"
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
              name="phoneNumber"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item label={t("employees.create.gender")} name="gender">
              <Radio.Group onChange={onChangeGender} value={gender}>
                <Radio value={Gender.Male}>
                  {t("employees.create.genderMale")}
                </Radio>
                <Radio value={Gender.Female}>
                  {t("employees.create.genderFemale")}
                </Radio>
              </Radio.Group>
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
        <div className="flex gap-2">
          <div className="flex-1">
            <Form.Item label={t("employees.create.role")} name="role">
              <Select
                options={roleData.map((role) => ({
                  value: role.value,
                  label: t(role.label),
                }))}
                placeholder={t("employees.create.selectRole")}
                onChange={(value) => {
                  formProps.form?.setFieldsValue({ directManager: undefined });
                  formProps.form?.setFieldValue("role", value);
                }}
              />
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.role !== currentValues.role
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("role") === 2 && (
                  <Form.Item
                    label={t("employees.create.directManager")}
                    name="directManager"
                  >
                    <Select
                      placeholder={t("employees.create.selectDirectManager")}
                      options={managerOptions}
                      loading={isLoading}
                      showSearch
                      optionFilterProp="label"
                      filterOption={(input, option) =>
                        (option?.label?.toString() || "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      optionRender={(option) => {
                        const manager = option.data.data;
                        return (
                          <div
                            key={manager.id}
                            className="flex items-center gap-2"
                          >
                            <Avatar
                              userName={manager.name}
                              src={
                                manager.hasAvatar
                                  ? endpoints.retrieveAvatar(manager.id)
                                  : null
                              }
                              size="small"
                            />
                            <span>{manager.name}</span>
                          </div>
                        );
                      }}
                    />
                  </Form.Item>
                )
              }
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

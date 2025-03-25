import React, { useState } from "react";

import { useForm } from "@refinedev/antd";

import { Form, Input, Modal, RadioChangeEvent } from "antd";

import { useGetIdentity, useNavigation } from "@refinedev/core";
import { FormCreation, User } from "types";
import { useTranslation } from "react-i18next";

export const FormCreate = () => {
  const { formProps, saveButtonProps, onFinish } = useForm<FormCreation>({
    redirect: "list",
  });

  const { t } = useTranslation();

  const { data: currentLoginUser } = useGetIdentity<User>();

  const { list } = useNavigation();

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      open
      title={t("forms.create.title")}
      style={{ display: "inherit" }}
      onCancel={() => {
        list("forms");
      }}
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
          label={t("forms.create.formName")}
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={t("forms.create.formDescription")} name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

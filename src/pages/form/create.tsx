import React from "react";

import { useForm } from "@refinedev/antd";

import { Form, Input, Modal } from "antd";

import { useNavigation } from "@refinedev/core";
import { FormCreation } from "types";
import { useTranslation } from "react-i18next";
import {useCreateForm} from "@/services/form/form-services";

export const FormCreate = () => {
  const { formProps, saveButtonProps } = useForm<FormCreation>({
    redirect: "list",
  });

  const { createForm } = useCreateForm();


  const onFinish =  (values: FormCreation) => {
    createForm(values);
  }

  const { t } = useTranslation();
  
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
        onFinish={(values: {}) => {
          onFinish(
            values as FormCreation 
          )
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

import React, { CSSProperties, useState } from "react";

import Modal from "antd/es/modal";
import Space from "antd/es/space";
import Button from "antd/lib/button";
import { PasswordInput } from "antd-password-input-strength";

import { Form, Input } from "antd";
import { useNotification } from "@refinedev/core";
import { changePassword } from "@/domains/user/user-services";

export interface ChangePasswordModalProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  opened,
  setOpened,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { open } = useNotification();

  const [form] = Form.useForm();

  const closeModal = () => {
    setOpened(false);
    form.resetFields();
  };

  const handleChangePW = async () => {
    setLoading(true);

    const popup = await changePassword({
      oldPassword,
      newPassword,
      confirmPassword,
    });

    open?.(popup);

    setLoading(false);

    if (popup.type == "success") closeModal();
  };

  const showConfirm = () => {
    Modal.confirm({
      title: "Xác nhận thay đổi mật khẩu?",

      content: "Sự thay đổi sẽ được áp dụng vào lần đăng nhập sau.",
      styles: {
        body: {
          padding: "24px",
        },
      },
      onOk: () => handleChangePW(),
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    });
  };

  const validateChangePw = () => {
    form.validateFields().then(() => {
      showConfirm();
    });
  };

  const formItemStyle: CSSProperties = {
    // marginBottom: "36px",
  };

  const formInputStyle: CSSProperties = {
    // margin: "0px"
  };

  return (
    <Modal
      open={opened}
      title="Đổi mật khẩu"
      destroyOnClose={true}
      maskClosable={true}
      onCancel={() => {
        closeModal();
      }}
      footer={() => (
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>

          <Button type="primary" onClick={validateChangePw} loading={loading}>
            Đổi mật khẩu
          </Button>
        </Space>
      )}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="oldPass"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu hiện tại!",
            },
          ]}
          style={formItemStyle}
        >
          <Input.Password
            style={formInputStyle}
            placeholder="Mật khẩu hiện tại"
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          style={formItemStyle}
          name="newPass"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!",
            },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*=()_\-+`~]{8,}$/,
              message:
                "Mật khẩu mới phải tối thiểu 8 ký tự Latin bao gồm chữ Hoa, thường, số và ký tự đặc biệt: !@#$%^&*=()_-+`~",
            },
          ]}
        >
          <PasswordInput
            style={formInputStyle}
            placeholder="Mật khẩu mới"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="confirmedPass"
          style={formItemStyle}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPass") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password
            style={formInputStyle}
            placeholder="Xác nhận mật khẩu"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;

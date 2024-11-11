import React, { useState } from "react";

import { useGetIdentity, useLogout } from "@refinedev/core";

import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Popover, Space } from "antd";

import { Text } from "@/components";
import User from "@/domains/user/user";
import Avatar from "@/components/avatar";
import ChangePasswordModal from "@/components/change-password";

export const CurrentUser: React.FC = () => {
  const [openChangePw, setOpenChangePw] = useState(false);
  const { data: user } = useGetIdentity<User>();
  const { mutate: logout } = useLogout();

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text
        strong
        style={{
          padding: "12px 20px",
        }}
      >
        {user?.userFullName}
      </Text>
      <div
        style={{
          borderTop: "1px solid #d9d9d9",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Button
          style={{ textAlign: "left" }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setOpenChangePw(true)}
        >
          Đổi mật khẩu
        </Button>
        <Button
          style={{ textAlign: "left" }}
          icon={<LogoutOutlined />}
          type="text"
          danger
          block
          onClick={() => logout()}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex" }}>
      <Space style={{ marginLeft: "8px" }} size="middle">
        <Text strong>{user?.userLastName}</Text>
        <Popover
          placement="bottomRight"
          content={content}
          trigger="click"
          overlayInnerStyle={{ padding: 0 }}
          overlayStyle={{ zIndex: 999 }}
        >
          <Avatar
            userName={user?.userLastName}
            src={user?.avatarUrl}
            size="default"
            style={{ cursor: "pointer" }}
          />
        </Popover>
      </Space>

      <ChangePasswordModal opened={openChangePw} setOpened={setOpenChangePw} />
      {/*{user && (*/}
      {/*    <AccountSettings*/}
      {/*        opened={opened}*/}
      {/*        setOpened={setOpened}*/}
      {/*        userId={user.id}*/}
      {/*    />*/}
      {/*)}*/}
    </div>
  );
};

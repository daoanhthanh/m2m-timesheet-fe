import React, { useState } from "react";

import { useGetIdentity, useLogout } from "@refinedev/core";

import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Popover, Space } from "antd";

import { Text } from "components";
import { AuthUser } from "types/user";
import Avatar from "components/avatar";
import ChangePasswordModal from "components/change-password";

export const CurrentUser: React.FC = () => {
  const [openChangePw, setOpenChangePw] = useState(false);
  const { data: user } = useGetIdentity<AuthUser>();
  const { mutate: logout } = useLogout();

  const content = (
    <div className="flex flex-col">
      <Text strong className="p-3">
        {user?.name}
      </Text>
      <div className="border-t border-gray-300 p-1 flex flex-col gap-1">
        <Button
          className="text-left"
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setOpenChangePw(true)}
        >
          Đổi mật khẩu
        </Button>
        <Button
          className="text-left"
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
    <div className="flex">
      <Space className="ml-2" size="middle">
        <Text strong>{user?.name}</Text>
        <Popover
          placement="bottomRight"
          content={content}
          trigger="click"
          styles={{
            body: {
              padding: 0,
            },
            root: {
              zIndex: 999,
            },
          }}
        >
          <Avatar
            userName={user?.name}
            src={user?.avatarUrl}
            size="default"
            className="cursor-pointer"
          />
        </Popover>
      </Space>

      <ChangePasswordModal opened={openChangePw} setOpened={setOpenChangePw} />
    </div>
  );
};

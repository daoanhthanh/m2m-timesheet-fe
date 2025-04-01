import { Button, Tooltip } from "antd";
import { Send } from "lucide-react";

import React from "react";
import { RocketOutlined, SendOutlined } from "@ant-design/icons";

export const PublishFormBtn = () => {
  return (
    <Tooltip placement="bottomRight" title={"Publish Form"}>
      <Button type={"primary"}>
        <Send size={18} />
      </Button>
    </Tooltip>
  );
};

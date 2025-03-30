import { Button, Tooltip } from "antd";
import { Send } from "lucide-react";

import React from "react";

export const PublishFormBtn = () => {
  return (
    <Tooltip placement="bottomRight" title={"Publish Form"}>
      <Button type={"primary"}>
        <Send />
      </Button>
    </Tooltip>
  );
};

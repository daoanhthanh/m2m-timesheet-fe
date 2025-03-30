import { Button, Tooltip } from "antd";
import { Save } from "lucide-react";
import React from "react";

export const SaveFormBtn = () => {
  return (
    <Tooltip placement="bottom" title={"Save Form"}>
      <Button>
        <Save />
      </Button>
    </Tooltip>
  );
};

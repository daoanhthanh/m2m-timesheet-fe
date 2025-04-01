import React, { useState } from "react";
import { Sidebar, SidebarContent } from "./sidebar-components";
import { cn } from "@/providers/utils";
import FormBlockBox from "@/pages/form/components/builder/form-block-box";
import FormSettings from "@/pages/form/components/builder/form-settings";
import { Layout } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export const FormBuilderSidebar = ({
  rest,
}: {
  rest?: React.ComponentProps<typeof Sidebar>;
}) => {
  const { Sider } = Layout;

  const [tab, setTab] = useState<"blocks" | "settings">("blocks");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsedWidth={0}
      trigger={collapsed ? <RightOutlined /> : <LeftOutlined />}
      onCollapse={setCollapsed}
      className="h-full bg-transparent"
      width="var(--sidebar-width)"
    >
      <SidebarContent className="p-5 bg-white h-full">
        <div className="w-full flex flex-row gap-1 h-[39px] rounded-full bg-gray-100 p-1">
          <button
            className={cn(
              `p-[5px] flex-1 bg-transparent
                transition-colors
                ease-in-out rounded-full text-center
                font-medium text-sm text-gray-400`,
              {
                "bg-white text-gray-600": tab === "blocks",
              },
            )}
            onClick={() => setTab("blocks")}
          >
            Blocks
          </button>
          <button
            className={cn(
              `p-[5px] flex-1 bg-transparent
                transition-colors
                ease-in-out rounded-full text-center
                font-medium text-sm text-gray-400`,
              {
                "bg-white text-gray-600": tab === "settings",
              },
            )}
            onClick={() => setTab("settings")}
          >
            Settings
          </button>
        </div>
        {/* {Form Blocks} */}
        {tab === "blocks" && <FormBlockBox />}
        {/* {Form Settings} */}
        {tab === "settings" && <FormSettings />}
      </SidebarContent>
    </Sider>
  );
};

import React, { useState } from "react";
import { Sidebar, SidebarContent } from "./sidebar-components";
import { cn } from "@/providers/utils";
import FormBlockBox from "@/pages/form/components/builder/form-block-box";
import FormSettings from "@/pages/form/components/builder/form-settings";
import { Layout, Segmented } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ThemeMode } from "@/providers/contexts/color-mode";

export type Props = {
  theme: ThemeMode;
};

export const FormBuilderSidebar: React.FC<Props> = ({ theme }) => {
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
      <SidebarContent
        className={cn(
          "p-5 h-full",
          theme === "light"
            ? "bg-[var(--main-component-background-light)]"
            : "bg-[var(--main-component-background-dark)]",
        )}
      >
        <div
          className={cn(
            "w-full flex flex-row gap-1 h-[39px] rounded-full bg-[var(--ant-color-primary-border)] p-1",
            {
              "dark:bg-gray-800": theme === "dark",
            },
          )}
        >
          <button
            className={cn(
              `p-[5px] flex-1 bg-transparent transition-colors
                  ease-in-out rounded-full text-center font-medium text-sm`,
              {
                "bg-[var(--ant-color-primary-active)] text-[#f5f5f5] shadow-md":
                  tab === "blocks",
              },
            )}
            onClick={() => setTab("blocks")}
          >
            Blocks
          </button>
          <button
            className={cn(
              `p-[5px] flex-1 bg-transparent transition-colors 
                  ease-in-out rounded-full text-center font-medium text-sm`,
              {
                "bg-[var(--ant-color-primary-active)] text-[#f5f5f5] shadow-md":
                  tab === "settings",
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

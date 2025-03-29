import React, { CSSProperties, useState } from "react";
import { Layout } from "antd";
import { cn } from "@/providers/utils";
import FormBlockBox from "@/pages/form/components/builder/form-block-box";
import FormSettings from "./form-settings";

const { Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};

const layoutStyle: CSSProperties = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  height: "100%",
};

const Builder = () => {
  const [tab, setTab] = useState<"blocks" | "settings">("blocks");

  return (
    <Layout style={layoutStyle}>
      <Sider width="25%" style={siderStyle}>
        <div className="w-full">
          <div
            className="w-full flex flex-row
           gap-1 h-[39px] rounded-full bg-gray-100 p-1"
          >
            <button
              className={cn(
                `p-[5px] flex-1 bg-transparent
                transition-colors
                ease-in-out rounded-full text-center
                font-medium text-sm
                              `,
                {
                  "bg-white": tab === "blocks",
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
                font-medium text-sm
                              `,
                {
                  "bg-white": tab === "settings",
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
        </div>
      </Sider>

      <Content style={contentStyle}>Content</Content>
      <Sider width="25%" style={siderStyle}>
        Sider
      </Sider>
    </Layout>
  );
};

export default Builder;

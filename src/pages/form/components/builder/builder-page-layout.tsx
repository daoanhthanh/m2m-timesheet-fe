import React, { CSSProperties, useState } from "react";
import { Layout } from "antd";
import { cn } from "@/providers/utils";
import FormBlockBox from "./form-block-box";
import FormSettings from "./form-settings";
import { BuilderContextProvider } from "@/hooks/use-form-builder";

const { Sider, Content } = Layout;

const contentStyle: CSSProperties = {
  textAlign: "center",
  minHeight: 120,
};

const siderStyle: CSSProperties = {
  textAlign: "center",
  backgroundColor: "transparent",
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
    <BuilderContextProvider>
      <Layout style={layoutStyle}>
        <Sider width="300px" style={siderStyle} className="p-1">
          <div className="w-full h-full p-4 bg-white rounded-lg shadow-sm">
            <div className="w-full flex flex-row gap-1 h-[39px] rounded-full bg-gray-300 p-1">
              <button
                className={cn(
                  "p-[5px] flex-1 bg-transparent transition-colors ease-in-out rounded-full text-center font-medium text-sm text-gray-500",
                  {
                    "bg-white text-gray-900": tab === "blocks",
                  },
                )}
                onClick={() => setTab("blocks")}
              >
                Blocks
              </button>
              <button
                className={cn(
                  "p-[5px] flex-1 bg-transparent transition-colors ease-in-out rounded-full text-center font-medium text-sm text-gray-500",
                  {
                    "bg-white text-gray-900": tab === "settings",
                  },
                )}
                onClick={() => setTab("settings")}
              >
                Settings
              </button>
            </div>
            {tab === "blocks" && <FormBlockBox />}
            {tab === "settings" && <FormSettings />}
          </div>
        </Sider>

        <Content style={contentStyle}>Content</Content>
        <Sider width="25%" style={siderStyle}>
          Sider
        </Sider>
      </Layout>
    </BuilderContextProvider>
  );
};

export default Builder;

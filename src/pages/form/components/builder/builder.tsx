import React from "react";
import { SidebarInset, SidebarTrigger } from "./sidebar-components";
import { defaultBackgroundColor } from "@/providers/constants";
import { Drawer, Layout } from "antd";
import { FormBuilderSidebar } from "@/pages/form/components/builder/from-builder-sidebar";

export const Builder1 = (props: { isSidebarOpen: boolean }) => {
  return (
    <>
      {/*<BuilderSidebar />*/}
      <SidebarInset className="!p-0 flex-1">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: defaultBackgroundColor,
          }}
        >
          <SidebarTrigger className=" absolute top-0 z-50" />
          {/*<BuilderCanvas />*/}
          {/*<FloatingShareButton isSidebarOpen={props.isSidebarOpen} />*/}
        </div>
      </SidebarInset>
      {/*<BuilderBlockProperties />*/}
    </>
  );
};

const { Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#0958d9",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#1677ff",
};

const layoutStyle: React.CSSProperties = {
  backgroundColor: "transparent",
};

export const Builder = (props: { isSidebarOpen: boolean }) => (
  // <Flex gap="middle" wrap>
  <Layout style={layoutStyle}>
    {/*<Sider width="var(--sidebar-width)" style={siderStyle}>*/}
    {/*</Sider>*/}
    <FormBuilderSidebar />
    <Layout>
      <Content style={contentStyle}>Content</Content>
    </Layout>

    <Sider width="var(--sidebar-width)" style={siderStyle}>
      Sider
    </Sider>
  </Layout>
);

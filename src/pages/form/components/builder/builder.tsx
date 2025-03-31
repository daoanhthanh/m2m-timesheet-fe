import React from "react";
import { SidebarInset, SidebarTrigger } from "./sidebar-components";
import { defaultBackgroundColor } from "@/providers/constants";
import { Layout } from "antd";
import { FormBuilderSidebar } from "@/pages/form/components/builder/from-builder-sidebar";
import {
  BuilderBlockProperties,
  BuilderCanvas,
} from "@/components/form-builder";

const layoutStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  display: "flex",
  flexDirection: "row",
  height: "100vh", // Full height to enable independent scrolling
  padding: "16px 0", // Maintain top and bottom padding
  overflow: "hidden", // Prevent scrolling on the entire layout
};

const sidebarStyle: React.CSSProperties = {
  flex: "0 0 auto", // Fixed width for the sidebar
  height: "100%", // Full height
  overflow: "hidden", // Prevent scrolling
};

const canvasStyle: React.CSSProperties = {
  flex: "1 1 auto", // Take remaining space
  height: "100%", // Full height
  overflowY: "auto", // Enable vertical scrolling
};

const propertiesStyle: React.CSSProperties = {
  flex: "0 0 auto", // Fixed width for the properties panel
  height: "100%", // Full height
  overflow: "hidden", // Prevent scrolling
};

export const Builder = (props: { isSidebarOpen: boolean }) => (
  <Layout style={layoutStyle}>
    <div style={sidebarStyle}>
      <FormBuilderSidebar />
    </div>
    <div style={canvasStyle}>
      <BuilderCanvas />
    </div>
    <div style={propertiesStyle}>
      <BuilderBlockProperties />
    </div>
  </Layout>
);

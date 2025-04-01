import React from "react";
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
  overflow: "hidden", // Prevent scrolling on the entire layout
};

export const Builder = (props: { isSidebarOpen: boolean }) => (
  <Layout style={layoutStyle}>
    <FormBuilderSidebar />
    <BuilderCanvas />
    <BuilderBlockProperties />
  </Layout>
);

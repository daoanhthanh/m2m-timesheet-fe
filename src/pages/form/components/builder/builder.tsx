import React from "react";
import { Layout } from "antd";
import { FormBuilderSidebar } from "@/pages/form/components/builder/from-builder-sidebar";
import {
  BuilderBlockProperties,
  BuilderCanvas,
} from "@/components/form-builder";
import { useThemeMode } from "@/hooks";

const layoutStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  display: "flex",
  flexDirection: "row",
  overflow: "hidden", // Prevent scrolling on the entire layout
};

export const Builder = (props: { isSidebarOpen: boolean }) => {
  const theme = useThemeMode();

  return (
    <Layout style={layoutStyle}>
      <FormBuilderSidebar theme={theme} />
      <BuilderCanvas />
      <BuilderBlockProperties />
    </Layout>
  );
};

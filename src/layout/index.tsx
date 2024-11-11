import React from "react";

import { ThemedLayoutContextProvider } from "@refinedev/antd";

import { Grid, Layout as AntdLayout } from "antd";
import { Header } from "@/components/header";
import { Sider } from "@/components/sider";
// import {GitHubBanner} from "@refinedev/core";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const breakpoint = Grid.useBreakpoint();
  const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm;

  return (
    <ThemedLayoutContextProvider>
      {/*<GitHubBanner/>*/}
      <AntdLayout hasSider style={{ minHeight: "100vh" }}>
        <Sider />
        <AntdLayout>
          <Header />
          <AntdLayout.Content
            style={{
              padding: isSmall ? 32 : 16,
            }}
          >
            {children}
          </AntdLayout.Content>
        </AntdLayout>
      </AntdLayout>
    </ThemedLayoutContextProvider>
  );
};

import React from "react";

import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import { useLink } from "@refinedev/core";

import { Space, theme, Typography } from "antd";

import { Logo } from "@/components/logo";

const { useToken } = theme;

export const Title: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {
  const { token } = useToken();
  const Link = useLink();

  return (
    <Link
      to="/login"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            ...wrapperStyles,
          }}
        >
          <Logo />
        </div>
      </Space>
    </Link>
  );
};

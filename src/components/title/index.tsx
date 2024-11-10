import React from "react";

import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import { useLink } from "@refinedev/core";
import styles from "./styles.module.css";

import { Space, theme } from "antd";

import { Logo } from "@/components/logo";

const { useToken } = theme;

export const Title: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {
  const Link = useLink();

  const { theme } = useToken();

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
          <Logo
            className={styles.companyLogo}
            mode={theme.id == 4 ? "dark" : "light"}
          />
        </div>
      </Space>
    </Link>
  );
};

import React from "react";

import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import { useLink } from "@refinedev/core";
import styles from "./styles.module.css";

import { Space } from "antd";

import { Logo } from "components/logo";
import { useThemeMode } from "@/hooks";

export const Title: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {
  const Link = useLink();
  const themeMode = useThemeMode();

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
          <Logo className={styles.companyLogo} mode={themeMode} />
        </div>
      </Space>
    </Link>
  );
};

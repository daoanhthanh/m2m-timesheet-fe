import React, { FC } from "react";

import { WarningOutlined } from "@ant-design/icons";

import styles from "./styles.module.css";

export type WarningContentProps = {
  content: React.ReactNode;
};

const Index: FC<WarningContentProps> = ({ content }) => {
  return (
    <div className={styles.warning}>
      <h3>
        <WarningOutlined twoToneColor="#52c41a" /> <span>Lưu ý</span>
      </h3>
      {content}
    </div>
  );
};

export default Index;

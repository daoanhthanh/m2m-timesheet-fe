import { FC, memo } from "react";

import type { AvatarProps } from "antd";
import { Avatar as AntdAvatar } from "antd";

import { getNameInitials, getRandomColorFromString } from "@/providers/utils";

type Props = AvatarProps & {
  userName?: string;
};

const AvatarComponent: FC<Props> = ({ userName = "", style, ...rest }) => {
  return (
    <AntdAvatar
      alt={userName}
      size="small"
      style={{
        backgroundColor: rest?.src
          ? "transparent"
          : getRandomColorFromString(userName),
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style,
      }}
      {...rest}
    >
      {getNameInitials(userName)}
    </AntdAvatar>
  );
};

const Avatar = memo(AvatarComponent, (prevProps, nextProps) => {
  return (
    prevProps.userName === nextProps.userName && prevProps.src === nextProps.src
  );
});

export default Avatar;

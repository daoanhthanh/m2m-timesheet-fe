import { FC, memo } from "react";

import type { AvatarProps } from "antd";
import { Avatar as AntdAvatar } from "antd";

import { getNameInitials, getRandomColorFromString } from "@/utils";

type Props = AvatarProps & {
  userName?: string;
};

const AvatarComponent: FC<Props> = ({ userName = "", style, ...rest }) => {
  let isValidImage = false;

  if (rest?.src) {
    fetch(rest.src as string, {
      method: "HEAD",
      credentials: "include",
    }).then((response) => {
      if (
        response.ok &&
        response.headers.get("Content-Type")?.startsWith("image/")
      ) {
        isValidImage = true;
      }
    });
  }

  return (
    <AntdAvatar
      alt={userName}
      size="small"
      style={{
        backgroundColor: isValidImage
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

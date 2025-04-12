import { ObjectBlockType } from "types";
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "antd";
import { cn } from "@/utils";
import { useTranslation } from "react-i18next";

export const BlockBtnElement = ({
  formBlock,
  disabled,
}: {
  formBlock: ObjectBlockType;
  disabled?: boolean;
}) => {
  const { icon: Icon, label } = formBlock.blockBtnElement;

  const { t } = useTranslation();

  const draggable = useDraggable({
    id: `block-btn-${formBlock.blockType}`,
    disabled: disabled,
    data: {
      blockType: formBlock.blockType,
      isBlockBtnElement: true,
    },
  });
  return (
    <Button
      disabled={disabled}
      ref={draggable.setNodeRef}
      className={cn(
        `
        flex flex-col gap-2
        h-[75px] w-20 cursor-grab
        !bg-white border
        text-gray-600
        hover:bg-white hover:ring-1
        hover:!ring-primary`,
        draggable.isDragging && "ring-2 ring-primary shadow-xl",
        disabled && "!cursor-default !pointer-events-none",
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon
        className="!w-8 !h-8
        !stroke-[0.9]
          !cursor-grab"
      />
      <h5
        className="text-[11.4px]
          -mt-1 text-gray-600    "
        style={{ fontWeight: 500 }}
      >
        {t(label)}
      </h5>
    </Button>
  );
};

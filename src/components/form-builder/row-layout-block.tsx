import {
  FormBlockInstance,
  FormBlocks,
  FormBlockType,
  FormCategoryType,
  FormErrorsType,
  HandleBlurFunc,
  ObjectBlockType,
} from "types";
import ChildCanvasComponentWrapper from "./child-canvas-component-wrapper";
import ChildFormComponentWrapper from "./child-form-component-wrapper";
import ChildPropertiesComponentWrapper from "./child-properties-component-wrapper";
import { Card, CardContent, CardFooter } from "components";
import { allBlockLayouts } from "providers/constants";
import {
  Active,
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { GripHorizontal, Rows2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useFormBuilder } from "@/hooks/use-form-builder";
import { generateUniqueId } from "@/providers/uuid-v4";
import { cn } from "@/providers/utils";
import { Button } from "antd";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { useThemeMode } from "@/hooks";
import { useTranslation } from "react-i18next";

const blockCategory: FormCategoryType = "Layout";
const blockType: FormBlockType = "RowLayout";

export const RowLayoutBlock: ObjectBlockType = {
  blockCategory,
  blockType,

  createInstance: (id: string) => ({
    id: `layout-${id}`,
    blockType,
    isLocked: false,
    attributes: {},
    childBlocks: [],
  }),

  blockBtnElement: {
    icon: Rows2,
    label: "forms.builder.sidebar.fields.rowLayout.name",
    description: "forms.builder.sidebar.fields.rowLayout.description",
  },

  canvasComponent: RowLayoutCanvasComponent,
  formComponent: RowLayoutFormComponent,
  propertiesComponent: RowLayoutPropertiesComponent,
};

function RowLayoutCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const {
    selectedBlockLayout,
    handleSelectedLayout,
    removeBlockLayout,
    duplicateBlockLayout,
    updateBlockLayout,
  } = useFormBuilder();

  const theme = useThemeMode();

  const { t } = useTranslation();

  const [activeBlock, setActiveBlock] = useState<Active | null>(null);

  const childBlocks = blockInstance.childBlocks || [];

  const isSelected = selectedBlockLayout?.id === blockInstance.id;

  const droppable = useDroppable({
    id: blockInstance.id,
    disabled: blockInstance.isLocked,
    data: {
      isLayoutDropArea: true,
    },
  });

  const draggable = useDraggable({
    id: blockInstance.id + "_drag-area",
    disabled: blockInstance.isLocked,
    data: {
      blockType: blockInstance.blockType,
      blockId: blockInstance.id,
      isCanvasLayout: true,
    },
  });

  useDndMonitor({
    onDragStart: (event) => {
      setActiveBlock(event.active);
    },
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || !active) return;
      setActiveBlock(null);

      console.log(over, "over");
      console.log(active, "active");

      const isBlockBtnElement = active?.data?.current?.isBlockBtnElement;
      const isLayout = active.data?.current?.blockType;

      const overBlockId = over?.id;

      if (
        isBlockBtnElement &&
        !allBlockLayouts.includes(isLayout) &&
        overBlockId === blockInstance.id
      ) {
        const blockType = active.data?.current?.blockType;
        const newBlock =
          FormBlocks[blockType as FormBlockType].createInstance(
            generateUniqueId(),
          );

        const updatedChildrenBlock = [...childBlocks, newBlock];
        updateBlockLayout(blockInstance.id, updatedChildrenBlock);
      }
    },
  });

  function removeChildBlock(e: { stopPropagation: () => void }, id: string) {
    e.stopPropagation();
    const filteredBlock = childBlocks.filter((child) => child.id !== id);
    updateBlockLayout(blockInstance.id, filteredBlock);
  }

  const PlaceHolder = () => {
    return (
      <div
        className="flex flex-col items-center
        justify-center border border-dotted
        border-primary
        bg-primary/10
        hover:bg-primary/5
        w-full h-28
        text-primary font-medium
        text-base
        gap-1
        "
      >
        <p
          className="
          text-center text-primary/80
          "
        >
          {t("forms.builder.instructions")}
        </p>
      </div>
    );
  };

  if (draggable.isDragging) return;
  return (
    <div ref={draggable.setNodeRef} className="max-w-full ">
      {blockInstance.isLocked && <Border />}

      <Card
        ref={droppable.setNodeRef}
        className={cn(
          `!w-full relative border 
        shadow-sm min-h-[120px] max-w-[768px] rounded-md !p-0`,
          theme === "light"
            ? "bg-[var(--main-component-background-light)]"
            : "bg-[var(--main-component-background-dark)]",
        )}
        onClick={() => {
          handleSelectedLayout(blockInstance);
        }}
      >
        <CardContent className="px-2 pb-2">
          {isSelected && !blockInstance.isLocked && (
            <div
              className="
             w-[5px] absolute left-0
             top-0 rounded-l-md
             h-full bg-primary
              "
            />
          )}
          {!blockInstance.isLocked && (
            <div
              {...draggable.listeners}
              {...draggable.attributes}
              role="button"
              className="
          flex items-center w-full h-[24px]
          cursor-move justify-center
          "
            >
              <GripHorizontal size="20px" className="text-muted-foreground" />
            </div>
          )}

          <div className="w-full flex flex-wrap gap-2">
            {!allBlockLayouts.includes(activeBlock?.data?.current?.blockType) &&
              !blockInstance.isLocked &&
              activeBlock?.data?.current?.isBlockBtnElement &&
              droppable.isOver && (
                <div
                  className="relative border border-dotted 
                border-primary bg-primary/10 w-full h-28"
                >
                  <div
                    className="absolute left-1/2 top-0 -translate-x-1/2
                     text-xs bg-primary text-white 
        text-center w-28 p-1 rounded-b-full shadow-md"
                  >
                    {t("forms.builder.dragHere")}
                  </div>
                </div>
              )}

            {!droppable.isOver && childBlocks?.length == 0 ? (
              <PlaceHolder />
            ) : (
              <div
                className="
                      flex w-full flex-col
                       items-center 
                       justify-start 
                       gap-4 py-4 px-3"
              >
                {childBlocks?.map((childBlock) => (
                  <div
                    key={childBlock.id}
                    className="w-full h-auto flex items-center justify-center gap-1"
                  >
                    <ChildCanvasComponentWrapper blockInstance={childBlock} />

                    {isSelected && !blockInstance.isLocked && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="danger"
                        className="!bg-transparent"
                        onClick={(e: { stopPropagation: () => void }) =>
                          removeChildBlock(e, childBlock.id)
                        }
                      >
                        <X size={12} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        {isSelected && !blockInstance.isLocked && (
          <CardFooter className="flex items-center gap-3 justify-end border-t py-3">
            <Button
              variant="outlined"
              size="small"
              color="cyan"
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                duplicateBlockLayout(blockInstance.id);
              }}
            >
              <CopyOutlined />
            </Button>

            <Button
              variant="solid"
              size="small"
              color="danger"
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                removeBlockLayout(blockInstance.id);
              }}
            >
              <DeleteOutlined />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

function RowLayoutFormComponent({
  blockInstance,
  handleBlur,
  formErrors,
}: {
  blockInstance: FormBlockInstance;
  handleBlur?: HandleBlurFunc;
  formErrors?: FormErrorsType;
}) {
  const childBlocks = blockInstance.childBlocks || [];

  return (
    <div className="max-w-full">
      {blockInstance.isLocked && <Border />}

      <Card
        className={cn(
          `!w-full bg-white relative border
          shadow-sm
            min-h-[120px]
            max-w-[768px]
                rounded-md !p-0
                `,
          blockInstance.isLocked && "!rounded-t-none",
        )}
      >
        <CardContent className="px-2 pb-2">
          <div className="flex flex-wrap gap-2">
            <div
              className="
             flex w-full flex-col
             items-center justify-center gap-4 py-4 px-3
            "
            >
              {childBlocks.map((childBlock) => (
                <div
                  key={childBlock.id}
                  className="flex items-center
                        justify-center 
                        gap-1 h-auto w-full"
                >
                  <ChildFormComponentWrapper
                    blockInstance={childBlock}
                    handleBlur={handleBlur}
                    isError={!!formErrors?.[childBlock.id]}
                    errorMessage={formErrors?.[childBlock.id]}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RowLayoutPropertiesComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const childBlocks = blockInstance.childBlocks || [];
  return (
    <div className="pt-3 w-full">
      <div className="flex w-full flex-col items-center justify-start gap-0 py-0 px-0">
        {childBlocks?.map((childBlock, index) => (
          <div
            key={childBlock.id}
            className="w-full flex items-center justify-center gap-1 h-auto"
          >
            <ChildPropertiesComponentWrapper
              index={index + 1}
              parentId={blockInstance.id}
              blockInstance={childBlock}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Border() {
  return (
    <div
      className="w-full rounded-t-md min-h-[8px] bg-primary
    "
    />
  );
}

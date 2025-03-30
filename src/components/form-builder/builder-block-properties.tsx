import React from "react";
import { useFormBuilder } from "@/hooks";
import { FormBlocks } from "@/types";
import { PreviewDialog, PublishFormBtn, SaveFormBtn } from "components/buttons";
import { MousePointerClickIcon } from "lucide-react";
import { Layout } from "antd";

export const BuilderBlockProperties = () => {
  const { selectedBlockLayout } = useFormBuilder();

  const LayoutPropertyBlock =
    selectedBlockLayout &&
    FormBlocks[selectedBlockLayout.blockType]?.propertiesComponent;

  return (
    <Layout.Sider
      width="var(--sidebar-width)"
      className="h-full bg-transparent"
    >
      <div className="flex flex-col items-center h-full border-2 rounded-xl">
        <div className="grid grid-cols-3 w-full items-center pb-2 pt-3 sticky border-b top-0 gap-2 px-2">
          <PreviewDialog />
          <SaveFormBtn />
          <PublishFormBtn />
        </div>

        {/* {Layout Property} */}
        {!selectedBlockLayout ? (
          <div
            className="text-gray-400 gap-1
                        text-center text-[15px] w-full flex flex-col
                        items-center
                        justify-center flex-1 h-auto"
          >
            <MousePointerClickIcon />
            <p>Click the layout to modify block</p>
          </div>
        ) : (
          <div className="w-full pt-1">
            <div className="px-2 pt-3 pb-3 border-b border-gray-200">
              <h5 className="text-left font-medium text-sm">
                Layout Block Properties
              </h5>

              {LayoutPropertyBlock && (
                <LayoutPropertyBlock blockInstance={selectedBlockLayout} />
              )}
            </div>
          </div>
        )}
      </div>
    </Layout.Sider>
  );
};

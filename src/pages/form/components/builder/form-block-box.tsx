import { BlockBtnElement } from "@/components/form-builder";
import React, { useState } from "react";
import { useFormBuilder } from "hooks/use-form-builder";
import { FormBlocks } from "types";
import { Button, Divider, Input } from "antd";

const FormBlockBox = () => {
  const { formData } = useFormBuilder();
  const isPublished = formData?.published;

  const [search, setSearch] = useState<string>("");

  const filteredBlocks = Object.values(FormBlocks).filter((block) =>
    block.blockBtnElement.label?.toLowerCase().includes(search.toLowerCase()),
  );

  const layoutBlocks = filteredBlocks.filter(
    (block) => block.blockCategory === "Layout",
  );

  const fieldBlocks = filteredBlocks.filter(
    (block) => block.blockCategory === "Field",
  );

  return (
    <div className="w-full">
      <div className="flex gap-2 py-4 text-sm">
        <Input
          placeholder="Search Blocks"
          className=" placeholder:text-gray-400 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/*<AIAssistanceBtn />*/}
        <Button>
          <span className="text-sm font-medium text-gray-600 tracking-wider">
            AI
          </span>
        </Button>
      </div>
      <div className="flex flex-col space-y-3 w-full">
        {layoutBlocks?.length > 0 && (
          <div className="mb-2">
            <p className="text-gray-500 font-medium">Layouts</p>

            <div className="pt-1 grid grid-cols-3 gap-3">
              {layoutBlocks?.map((block) => (
                <BlockBtnElement
                  key={block.blockType}
                  formBlock={block}
                  disabled={isPublished}
                />
              ))}
            </div>
          </div>
        )}

        <Divider className="!bg-gray-200" />
        <div>
          <p className="text-gray-500 font-medium">Fields</p>

          <div className="pt-1 grid grid-cols-3 gap-3">
            {fieldBlocks?.map((block) => (
              <BlockBtnElement
                key={block.blockType}
                formBlock={block}
                disabled={isPublished}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBlockBox;

import { Button, Tooltip } from "antd";
import { Save } from "lucide-react";
import React, { useState } from "react";
import { useFormBuilder } from "@/hooks";
import { useUpdate } from "@refinedev/core";

export const SaveFormBtn = () => {
  const { formData, setFormData, blockLayouts } = useFormBuilder();
  const formId = formData?.formId;

  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useUpdate({
    resource: "forms",
  });

  const saveFormData = async () => {
    try {
      if (!formId) return;
      setIsLoading(true);

      const lockedBlockLayout = blockLayouts.find((block) => block.isLocked);

      const name = lockedBlockLayout?.childBlocks?.find(
        (child) => child.blockType === "Heading",
      )?.attributes?.label as string;

      const description = lockedBlockLayout?.childBlocks?.find(
        (child) => child.blockType === "Paragraph",
      )?.attributes?.text as string;

      const jsonBlocks = JSON.stringify(blockLayouts);

      const response = await saveForm({
        formId,
        name,
        description,
        jsonBlocks,
      });

      if (response?.success) {
        toast({
          title: "Success",
          description: response.message,
        });
        if (response.form) {
          setFormData({
            ...formData,
            ...response.form,
          });
        }
      } else {
        toast({
          title: "Error",
          description: response?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip placement="bottom" title={"Save Form"}>
      <Button onClick={saveFormData}>
        <Save size={18} />
      </Button>
    </Tooltip>
  );
};

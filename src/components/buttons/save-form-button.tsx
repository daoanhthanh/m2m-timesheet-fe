import { Button, Tooltip } from "antd";
import { Save } from "lucide-react";
import React from "react";
import { useFormBuilder } from "@/hooks";
import { useNotification, useUpdate } from "@refinedev/core";
import { useTranslation } from "react-i18next";
import { Form } from "@/types";

export const SaveFormBtn = () => {
  const { formData, blockLayouts } = useFormBuilder();
  const formId = formData?.formId;
  const { t } = useTranslation();

  const { open } = useNotification();

  const { mutate, isLoading } = useUpdate<Form>({
    resource: "forms",
    mutationOptions: {
      retry: 3,
      onSuccess: (data) => {
        open?.({
          type: "success",
          message: t("forms.create.success", {
            formName: data.data?.name,
          }),
        });
      },
      onError: (error, variables, context) => {
        open?.({
          type: "error",
          message: error.message,
        });
      },
    },
  });

  const saveFormData = async () => {
    if (!formId) return;
    const lockedBlockLayout = blockLayouts.find((block) => block.isLocked);

    formData.name = lockedBlockLayout?.childBlocks?.find(
      (child) => child.blockType === "Heading",
    )?.attributes?.label as string;

    formData.description = lockedBlockLayout?.childBlocks?.find(
      (child) => child.blockType === "Paragraph",
    )?.attributes?.text as string;

    formData.jsonBlocks = JSON.stringify(blockLayouts);

    mutate({
      id: formId,
      values: formData,
    });
  };

  return (
    <Tooltip placement="bottom" title={"Save Form"}>
      <Button onClick={saveFormData} loading={isLoading}>
        <Save size={18} />
      </Button>
    </Tooltip>
  );
};

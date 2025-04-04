import React, { useEffect } from "react";
import { z } from "zod";
import { ChevronDown, HeadingIcon } from "lucide-react";
import { Form, Input, Select } from "antd";
import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "types";
import { fontSizeClass, fontWeightClass } from "providers/constants";
import { useFormBuilder } from "@/hooks/use-form-builder";
import { useTranslation } from "react-i18next";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "Heading";

type fontSizeType =
  | "small"
  | "medium"
  | "large"
  | "x-large"
  | "2x-large"
  | "4x-large";

type fontWeightType = "normal" | "bold" | "bolder" | "lighter";

type attributesType = {
  label: string;
  level: 1 | 2 | 3 | 4 | 5 | 6; // Corresponds to heading levels (h1 - h6)
  fontSize: fontSizeType;
  fontWeight: fontWeightType;
};

type propertiesValidateSchemaType = z.infer<typeof propertiesValidateSchema>;

const propertiesValidateSchema = z.object({
  label: z.string().trim().min(2).max(255),
  level: z.number().min(1).max(6).default(1), // Defaults to H1
  fontSize: z
    .enum(["small", "medium", "large", "x-large", "2x-large", "4x-large"])
    .default("medium"),
  fontWeight: z.enum(["normal", "bold", "bolder", "lighter"]).default("normal"),
});

export const HeadingBlock: ObjectBlockType = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Heading",
      level: 1, // Default to H1
      fontSize: "medium",
      fontWeight: "normal",
    },
  }),
  blockBtnElement: {
    icon: HeadingIcon,
    label: "forms.builder.sidebar.fields.heading.name",
    description: "forms.builder.sidebar.fields.heading.description",
  },
  canvasComponent: HeadingCanvasFormComponent, // Renders the heading block on the canvas
  formComponent: HeadingCanvasFormComponent, // Customize as needed
  propertiesComponent: HeadingPropertiesComponent, // Properties editor
};

type NewInstance = FormBlockInstance & {
  attributes: attributesType;
};

function HeadingCanvasFormComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const block = blockInstance as NewInstance;
  const { level, label, fontSize, fontWeight } = block.attributes;
  return (
    <div
      className={`w-full text-left
         ${fontSizeClass[fontSize]} ${fontWeightClass[fontWeight]}`}
    >
      {React.createElement(
        `h${level}`, // Dynamically create heading tag based on 'level'
        {}, // No additional props for the heading element
        label, // Label for the heading
      )}
    </div>
  );
}

function HeadingPropertiesComponent({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) {
  const block = blockInstance as NewInstance;
  const { updateChildBlock } = useFormBuilder();
  const { t } = useTranslation();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      fontSize: block.attributes.fontSize,
      fontWeight: block.attributes.fontWeight,
      level: block.attributes.level,
    });
  }, [block.attributes, form]);

  function setChanges(values: propertiesValidateSchemaType) {
    if (!parentId) return null;
    updateChildBlock(parentId, block.id, {
      ...block,
      attributes: {
        ...block.attributes,
        ...values,
      },
    });
  }

  return (
    <div className="w-full pb-4">
      <div className="w-full flex flex-row items-center justify-between gap-1 bg-gray-100 h-auto p-1 px-2 mb-[10px]">
        <p className="text-sm font-medium text-gray-600 tracking-wider">
          {/*Heading {positionIndex}*/}
          {`${t("forms.builder.sidebar.fields.heading.name")} ${positionIndex && positionIndex > 1 ? `(${positionIndex})` : ""}`}
        </p>
        {/*<ChevronDown className="w-4 h-4" />*/}
      </div>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(changedValues, allValues) => setChanges(allValues)}
      >
        <Form.Item label="Label" name="label" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Font Size" name="fontSize">
          <Select>
            <Select.Option value="small">Small</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="large">Large</Select.Option>
            <Select.Option value="x-large">Xtra Large</Select.Option>
            <Select.Option value="2x-large">2Xtra Large</Select.Option>
            <Select.Option value="4x-large">4Xtra Large</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Font Weight" name="fontWeight">
          <Select>
            <Select.Option value="normal">Normal</Select.Option>
            <Select.Option value="bold">Bold</Select.Option>
            <Select.Option value="bolder">Bolder</Select.Option>
            <Select.Option value="lighter">Lighter</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Level" name="level">
          <Select>
            <Select.Option value={1}>H1</Select.Option>
            <Select.Option value={2}>H2</Select.Option>
            <Select.Option value={3}>H3</Select.Option>
            <Select.Option value={4}>H4</Select.Option>
            <Select.Option value={5}>H5</Select.Option>
            <Select.Option value={6}>H6</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}

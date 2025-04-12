import { Form, Input, Select } from "antd";
import { ChevronDown, TextIcon } from "lucide-react";
import { useEffect } from "react";

import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  ObjectBlockType,
} from "types";
import { fontSizeClass, fontWeightClass } from "@/utils/constants";
import { z } from "zod";
import { useFormBuilder } from "@/hooks/use-form-builder";
import { useTranslation } from "react-i18next";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "Paragraph";

type fontSizeType = "small" | "medium" | "large";

type fontWeightType = "bold" | "normal" | "lighter";

type attributesType = {
  label: string;
  text: string;
  fontSize: fontSizeType;
  fontWeight: fontWeightType;
};

type ParagraphPropertiesSchema = z.infer<typeof paragraphValidateSchema>;
const paragraphValidateSchema = z.object({
  text: z.string().trim().min(1).max(1000),
  fontSize: z.enum(["small", "medium", "large"]).default("small"),
  fontWeight: z.enum(["normal", "lighter"]).default("normal"),
});

export const ParagraphBlock: ObjectBlockType = {
  blockType,
  blockCategory,

  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Paragraph",
      text: "Lorem ipsum dolor sit amet,consectetur adipiscing elit. Curabitur quis sem odio. Sed commodo vestibulum leo.",
      fontSize: "small",
      fontWeight: "normal",
    },
  }),

  // Button in the UI that allows the user to add a new block
  blockBtnElement: {
    icon: TextIcon,
    label: "forms.builder.sidebar.fields.paragraph.name",
    description: "forms.builder.sidebar.fields.paragraph.description",
  },
  canvasComponent: ParagraphCanvasFormComponent,
  formComponent: ParagraphCanvasFormComponent,
  propertiesComponent: ParagraphPropertiesComponent, // Customizable properties editor
};

type NewInstance = FormBlockInstance & {
  attributes: attributesType;
};

function ParagraphCanvasFormComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const block = blockInstance as NewInstance;
  const { text, fontSize, fontWeight } = block.attributes;

  return (
    <div
      className={`w-full text-left ${fontSizeClass[fontSize]} ${fontWeightClass[fontWeight]}`}
    >
      <p>{text}</p>
    </div>
  );
}

function ParagraphPropertiesComponent({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) {
  const { updateChildBlock } = useFormBuilder();
  const block = blockInstance as NewInstance;
  const { t } = useTranslation();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      text: block.attributes.text,
      fontSize: block.attributes.fontSize,
      fontWeight: block.attributes.fontWeight,
    });
  }, [block.attributes, form]);

  const setChanges = (values: ParagraphPropertiesSchema) => {
    if (!parentId) return null;
    updateChildBlock(parentId, block.id, {
      ...block,
      attributes: {
        ...block.attributes,
        ...values,
      },
    });
  };

  return (
    <div className="w-full pb-4">
      <div className="w-full flex flex-row items-center justify-between gap-1 bg-gray-100 h-auto p-1 px-2 mb-[10px]">
        <p className="text-sm font-medium text-gray-600 tracking-wider">
          {/*Paragraph {positionIndex}*/}
          {`${t("forms.builder.sidebar.fields.paragraph.name")} ${positionIndex && positionIndex > 1 ? `(${positionIndex})` : ""}`}
        </p>
        {/*<ChevronDown className="w-4 h-4" />*/}
      </div>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(changedValues, allValues) => setChanges(allValues)}
      >
        <Form.Item label="Content" name="text" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Font Size" name="fontSize">
          <Select>
            <Select.Option value="small">Small</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="large">Large</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Font Weight" name="fontWeight">
          <Select>
            <Select.Option value="bold">Bold</Select.Option>
            <Select.Option value="normal">Normal</Select.Option>
            <Select.Option value="lighter">Lighter</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}

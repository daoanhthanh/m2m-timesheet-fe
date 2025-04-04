import { z } from "zod";
import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  HandleBlurFunc,
  ObjectBlockType,
} from "types";
import { ChevronDown, LetterTextIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Form as AntdForm, Input, Switch, Typography } from "antd";
import { useFormBuilder } from "@/hooks/use-form-builder";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "TextArea";

type attributesType = {
  label: string;
  helperText: string;
  required: boolean;
  placeHolder: string;
  rows: number;
};

type PropertiesValidateSchemaType = z.infer<typeof propertiesValidateSchema>;

const propertiesValidateSchema = z.object({
  placeHolder: z.string().trim().optional(),
  label: z.string().trim().min(2).max(255),
  required: z.boolean().default(false),
  helperText: z.string().trim().max(255).optional(),
  rows: z.number().min(1).max(20).default(3),
});

export const TextAreaBlock: ObjectBlockType = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Textarea",
      helperText: "",
      required: false,
      placeHolder: "Enter text here.",
      rows: 3, // Default rows
    },
  }),
  blockBtnElement: {
    icon: LetterTextIcon, // Replace with your custom icon
    label: "forms.builder.sidebar.fields.textarea.name",
    description: "forms.builder.sidebar.fields.textarea.description",
  },
  canvasComponent: TextAreaCanvasComponent,
  formComponent: TextAreaFormComponent,
  propertiesComponent: TextAreaPropertiesComponent,
};

type NewInstance = FormBlockInstance & {
  attributes: attributesType;
};

function TextAreaCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const block = blockInstance as NewInstance;
  const { label, placeHolder, required, helperText, rows } = block.attributes; // Destructure attributes

  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography.Text
        className="text-base !font-normal
       mb-2"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Typography.Text>
      <Input.TextArea
        placeholder={placeHolder}
        rows={rows || 3} // Default row value if not provided
        cols={50} // Default column value if not provided
        readOnly
        className="resize-none !min-h-[50px]
        !pointer-events-none cursor-default"
      />
      {helperText && (
        <p
          className="text-muted-foreground
        text-[0.8rem]"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

function TextAreaFormComponent({
  blockInstance,
  handleBlur,
  isError: isSubmitError,
  errorMessage,
}: {
  blockInstance: FormBlockInstance;
  handleBlur?: HandleBlurFunc;
  isError?: boolean;
  errorMessage?: string;
}) {
  const block = blockInstance as NewInstance;
  const { label, placeHolder, required, helperText, rows } = block.attributes; // Destructure attributes

  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);

  const validateField = (val: string) => {
    if (required) {
      return val.trim().length > 0; // Validation: Required fields must not be empty.
    }
    return true; // If not required, always valid.
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography.Text
        className={`text-base !font-normal mb-2 ${
          isError || isSubmitError ? "text-red-500" : ""
        }`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Typography.Text>
      <Input.TextArea
        placeholder={placeHolder}
        rows={rows || 3} // Default row value if not provided
        cols={50} // Default column value if not provided
        className={`resize-none !min-h-[50px] ${
          isError || isSubmitError ? "!border-red-500" : ""
        }`}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={(event) => {
          const inputValue = event.target.value;
          const isValid = validateField(inputValue);
          setIsError(!isValid); // Set error state based on validation.
          if (handleBlur) {
            handleBlur(block.id, inputValue);
          }
        }}
      />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}

      {isError || isSubmitError ? (
        <p className="text-red-500 text-[0.8rem]">
          {required && value.trim().length === 0
            ? `This field is required.`
            : ""}
        </p>
      ) : (
        errorMessage && (
          <p className="text-red-500 text-[0.8rem]">{errorMessage}</p>
        )
      )}
    </div>
  );
}

function TextAreaPropertiesComponent({
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

  const [form] = AntdForm.useForm();

  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      helperText: block.attributes.helperText,
      required: block.attributes.required,
      placeHolder: block.attributes.placeHolder,
      rows: block.attributes.rows,
    });
  }, [block.attributes, form]);

  function setChanges(values: PropertiesValidateSchemaType) {
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
        <span className="text-sm font-medium text-gray-600 tracking-wider">
          Textarea {positionIndex}
        </span>
        <ChevronDown className="w-4 h-4" />
      </div>
      <AntdForm
        form={form}
        layout="vertical"
        onValuesChange={(changedValues, allValues) => setChanges(allValues)}
      >
        <AntdForm.Item label="Label" name="label" rules={[{ required: true }]}>
          <Input />
        </AntdForm.Item>
        <AntdForm.Item label="Helper Text" name="helperText">
          <Input />
        </AntdForm.Item>
        <AntdForm.Item label="Placeholder" name="placeHolder">
          <Input />
        </AntdForm.Item>
        <AntdForm.Item label="Rows" name="rows">
          <Input type="number" />
        </AntdForm.Item>
        <AntdForm.Item label="Required" name="required" valuePropName="checked">
          <Switch />
        </AntdForm.Item>
      </AntdForm>
    </div>
  );
}

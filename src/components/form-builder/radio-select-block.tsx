import { Form, Input, Button, Switch, Radio, Typography } from "antd";
import { ChevronDown, CircleIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  HandleBlurFunc,
  ObjectBlockType,
} from "@/types";
import { useFormBuilder } from "@/hooks/use-form-builder";
import { z } from "zod";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "RadioSelect";

type attributesType = {
  label: string;
  options: string[];
  required: boolean;
};

type propertiesValidateSchemaType = z.infer<typeof propertiesValidateSchema>;

const propertiesValidateSchema = z.object({
  label: z.string().trim().min(2).max(255),
  required: z.boolean().default(false),
  options: z.array(z.string().min(1)),
});

export const RadioSelectBlock: ObjectBlockType = {
  blockCategory,
  blockType,

  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Select an option",
      options: ["Option 1", "Option 2"],
      required: false,
    },
  }),

  blockBtnElement: {
    icon: CircleIcon,
    label: "Radio",
  },

  canvasComponent: RadioSelectCanvasComponent,
  formComponent: RadioSelectFormComponent,
  propertiesComponent: RadioSelectPropertiesComponent,
};

type NewInstance = FormBlockInstance & {
  attributes: attributesType;
};

function RadioSelectCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const block = blockInstance as NewInstance;
  const { label, options, required } = block.attributes;

  return (
    <div className="flex flex-col gap-3 w-full">
      <Typography.Text className="text-base !font-normal mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Typography.Text>
      <Radio.Group disabled className="space-y-3">
        {options?.map((option: string, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <Radio value={option} />
            <Typography.Text>{option}</Typography.Text>
          </div>
        ))}
      </Radio.Group>
    </div>
  );
}

function RadioSelectFormComponent({
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
  const { label, options, required } = block.attributes;

  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);

  const validateField = (val: string) => {
    if (required) {
      return val.trim().length > 0;
    }
    return true;
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Typography.Text
        className={`text-base !font-normal mb-2 ${
          isError || isSubmitError ? "text-red-500" : ""
        }`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Typography.Text>
      <Radio.Group
        value={value}
        className="space-y-3"
        onChange={(e) => {
          const selectedValue = e.target.value;
          setValue(selectedValue);
          const isValid = validateField(selectedValue);
          setIsError(!isValid);
          if (handleBlur) {
            handleBlur(block.id, selectedValue);
          }
        }}
      >
        {options?.map((option: string, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <Radio value={option} />
            <Typography.Text>{option}</Typography.Text>
          </div>
        ))}
      </Radio.Group>
      {isError ? (
        <p className="text-red-500 text-[0.8rem]">
          {required && value.trim().length === 0
            ? "This field is required"
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

function RadioSelectPropertiesComponent({
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

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      label: block.attributes.label,
      required: block.attributes.required,
      options: block.attributes.options,
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
        <span className="text-sm font-medium text-gray-600 tracking-wider">
          Radio {positionIndex}
        </span>
        <ChevronDown className="w-4 h-4" />
      </div>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(changedValues, allValues) => setChanges(allValues)}
      >
        <Form.Item label="Label" name="label" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Options" name="options">
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey }) => (
                  <div key={key} className="flex items-center gap-2">
                    <Form.Item
                      name={name}
                      fieldKey={fieldKey}
                      rules={[
                        { required: true, message: "Option is required" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Button
                      type="link"
                      onClick={() => remove(name)}
                      icon={<X />}
                    />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()}>
                  Add Option
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item label="Required" name="required" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </div>
  );
}

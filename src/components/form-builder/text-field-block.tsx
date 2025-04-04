import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import {
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  HandleBlurFunc,
  ObjectBlockType,
} from "types";
import { z } from "zod";
import { ChevronDown, TextCursorInput } from "lucide-react";
import { Input, Switch, Typography } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormBuilder } from "@/hooks/use-form-builder";
import { useTranslation } from "react-i18next";

const blockCategory: FormCategoryType = "Field";
const blockType: FormBlockType = "TextField";

type attributesType = {
  label: string;
  helperText: string;
  required: boolean;
  placeHolder: string;
};

type propertiesValidateSchemaType = z.infer<typeof propertiesValidateSchema>;

const propertiesValidateSchema = z.object({
  placeHolder: z.string().trim().optional(),
  label: z.string().trim().min(2).max(255),
  required: z.boolean().default(false),
  helperText: z.string().trim().max(255).optional(),
});

export const TextFieldBlock: ObjectBlockType = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Text field",
      helperText: "",
      required: false,
      placeHolder: "Enter text",
    },
  }),
  blockBtnElement: {
    icon: TextCursorInput,
    label: "forms.builder.sidebar.fields.textField.name",
    description: "forms.builder.sidebar.fields.textField.description",
  },
  canvasComponent: TextFieldCanvasComponent,
  formComponent: TextFieldFormComponent,
  propertiesComponent: TextFieldPropertiesComponent,
};

type NewInstance = FormBlockInstance & {
  attributes: attributesType;
};

function TextFieldCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const block = blockInstance as NewInstance;
  const { helperText, label, placeHolder, required } = block.attributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography.Text className="text-base !font-normal mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Typography.Text>
      <Input
        readOnly
        className="!pointer-events-none 
        cursor-default h-10"
        placeholder={placeHolder}
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

function TextFieldFormComponent({
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
  const { helperText, label, placeHolder, required } = block.attributes;

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
      <Input
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
        className={`h-10 ${isError || isSubmitError ? "!border-red-500" : ""}`}
        placeholder={placeHolder}
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

function TextFieldPropertiesComponent({
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

  const form = useForm<propertiesValidateSchemaType>({
    resolver: zodResolver(propertiesValidateSchema),
    mode: "onBlur",
    defaultValues: {
      label: block.attributes.label,
      helperText: block.attributes.helperText,
      required: block.attributes.required,
      placeHolder: block.attributes.placeHolder,
    },
  });

  useEffect(() => {
    form.reset({
      label: block.attributes.label,
      helperText: block.attributes.helperText,
      required: block.attributes.required,
      placeHolder: block.attributes.placeHolder,
    });
  }, [block.attributes, form]);

  function setChanges(values: propertiesValidateSchemaType) {
    if (!parentId) return null;
    updateChildBlock(parentId, block.id, {
      ...block,
      attributes: {
        ...block.attributes,
        ...values, // Merge new values into block's attributes
      },
    });
  }

  return (
    <div className="w-full pb-4">
      <div className="w-full rounded-[var(--ant-border-radius)] flex flex-row items-center justify-between gap-1 bg-gray-100 h-auto p-1 px-2 mb-[10px]">
        <p className="text-sm font-medium text-gray-600 tracking-wider">
          {`${t("forms.builder.sidebar.fields.textField.name")} ${
            positionIndex && positionIndex > 1 ? `(${positionIndex})` : ""
          }`}
        </p>
        {/*<ChevronDown className="w-4 h-4" />*/}
      </div>
      <Form {...form}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full space-y-3 px-4"
        >
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem className="text-end">
                <div className="flex items-baseline justify-between w-full gap-2">
                  <FormLabel className="text-[13px]  font-normal">
                    Label
                  </FormLabel>
                  <div className=" w-full max-w-[187px]">
                    <FormControl>
                      <Input
                        {...field}
                        className="max-w-[187px]"
                        onChange={(e) => {
                          field.onChange(e); // Update form state
                          setChanges({
                            ...form.getValues(),
                            label: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="helperText"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex items-baseline justify-between w-full gap-2">
                  <FormLabel className="text-[13px]  font-normal">
                    Note
                  </FormLabel>
                  <div className=" w-full max-w-[187px]">
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // Update form state
                          setChanges({
                            ...form.getValues(),
                            helperText: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                    <FormDescription
                      className="text-[11px] 
                    mt-2 pl-1"
                    >
                      Provide a short note to guide users
                    </FormDescription>
                  </div>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="placeHolder"
            render={({ field }) => (
              <FormItem className="text-end">
                <div className="flex items-baseline justify-between w-full gap-2">
                  <FormLabel className="text-[13px]  font-normal">
                    Placeholder
                  </FormLabel>
                  <div className="w-full max-w-[187px]">
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // Update form state
                          setChanges({
                            ...form.getValues(),
                            placeHolder: e.target.value,
                          });
                        }}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="text-end">
                <div className="flex items-center justify-between w-full gap-2">
                  <FormLabel className="text-[13px] font-normal">
                    Required
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onChange={(value) => {
                        field.onChange(value); // Update form state
                        setChanges({
                          ...form.getValues(),
                          required: value,
                        });
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

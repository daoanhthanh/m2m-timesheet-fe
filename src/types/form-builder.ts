import React from "react";
import {
  HeadingBlock,
  ParagraphBlock,
  RadioSelectBlock,
  RowLayoutBlock,
  StarRatingBlock,
  TextAreaBlock,
  TextFieldBlock,
} from "@/components/form-builder";

export type FormCategoryType = "Layout" | "Field";

export type FormBlockType =
  | "RowLayout"
  | "RadioSelect"
  | "TextField"
  | "TextArea"
  | "StarRating"
  | "Heading"
  | "Paragraph";

export type HandleBlurFunc = (key: string, value: string) => void;

export type FormErrorsType = {
  [key: string]: string;
};

export type ObjectBlockType = {
  blockCategory: FormCategoryType;
  blockType: FormBlockType;

  createInstance: (id: string) => FormBlockInstance;

  blockBtnElement: {
    icon: React.ElementType;
    label: string;
    description?: string;
  };

  canvasComponent: React.FC<{
    blockInstance: FormBlockInstance;
  }>;
  formComponent: React.FC<{
    blockInstance: FormBlockInstance;
    isError?: boolean;
    errorMessage?: string;
    handleBlur?: HandleBlurFunc;
    formErrors?: FormErrorsType;
  }>;

  propertiesComponent: React.FC<{
    positionIndex?: number;
    parentId?: string;
    blockInstance: FormBlockInstance;
  }>;
};

export type FormBlockInstance = {
  id: string;
  blockType: FormBlockType;
  attributes?: Record<string, any>;
  childBlocks?: FormBlockInstance[];
  isLocked?: boolean;
};

export type FormBlocksType = {
  [key in FormBlockType]: ObjectBlockType;
};

export const FormBlocks: FormBlocksType = {
  RowLayout: RowLayoutBlock,
  Heading: HeadingBlock,
  Paragraph: ParagraphBlock,
  TextField: TextFieldBlock,
  TextArea: TextAreaBlock,
  RadioSelect: RadioSelectBlock,
  StarRating: StarRatingBlock,
};

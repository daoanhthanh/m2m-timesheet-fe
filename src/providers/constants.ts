import { RowLayoutBlock } from "@/components/form-builder/row-layout-block";
import { FormBlocksType } from "@/types";
import { HeadingBlock } from "@/components/form-builder/heading-block";
import { ParagraphBlock } from "@/components/form-builder/paragraph-block";
import { TextFieldBlock } from "@/components/form-builder/text-field";
import { TextAreaBlock } from "@/components/form-builder/text-area-block";
import { RadioSelectBlock } from "@/components/form-builder/radio-select-block";
import { StarRatingBlock } from "@/components/form-builder/star-rating-block";

export const defaultPrimaryColor = "#673ab7";
export const defaultBackgroundColor = "#f0ebf8";

export const allBlockLayouts = ["RowLayout", "ColumnLayout", "GridLayout"];

export const fontWeightClass = {
  normal: "font-normal",
  bold: "font-bold",
  bolder: "font-extrabold", // Tailwind uses 'font-extrabold' for 'bolder'
  lighter: "font-extralight", // Tailwind uses 'font-light' for 'lighter'
};

export const fontSizeClass = {
  small: "text-sm", // Tailwind class for small font
  medium: "text-base", // Tailwind class for medium font
  large: "text-lg", // Tailwind class for large font
  "x-large": "text-xl", // Tailwind class for extra large font
  "2x-large": "text-2xl",
  "4x-large": "text-4xl",
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

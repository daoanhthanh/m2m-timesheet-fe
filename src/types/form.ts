export interface FormCreation {
  name: string;
  description: string;
}

export interface FormSettings {
  id: number;
  primaryColor: string;
  backgroundColor: string;
  createdAt: Date;
  updatedAt: Date;
}

export type FormSettingsRequest = Pick<
  FormSettings,
  "primaryColor" | "backgroundColor"
>;

export interface Form {
  id: number;
  formId: string;
  name: string;
  description?: string;
  jsonBlocks: string;
  responses: number;
  views: number;
  published: boolean;
  creatorId: number;
  creatorName: string;
  settings: FormSettings;
  createdAt: Date;
  updatedAt: Date;
}

export type FormRequest = Pick<
  Form,
  | "name"
  | "description"
  | "jsonBlocks"
  | "responses"
  | "views"
  | "published"
  | "creatorId"
  | "creatorName"
> & {
  settings: FormSettingsRequest;
};

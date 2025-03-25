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

export interface Form {
  id: number;
  formId: string;
  name: string;
  description: string;
  responses: number;
  views: number;
  createdAt: Date;
  published: boolean;
  creatorName: string;
  creatorId: number;
  settings: FormSettings;
}

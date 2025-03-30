import React from "react";
import { BuilderContextProvider } from "@/hooks/use-form-builder";
import { FormBuilder } from "@/pages/form/components/builder/form-builder";

export const FormBuilderPage = () => {
  return (
    <BuilderContextProvider>
      <FormBuilder />
    </BuilderContextProvider>
  );
};

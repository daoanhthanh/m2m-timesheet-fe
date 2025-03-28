import { useState } from "react";
import { generateUniqueId } from "@/providers/utils";
import {
  defaultBackgroundColor,
  defaultPrimaryColor,
} from "@/providers/constants";
import { useCreate, useGetIdentity } from "@refinedev/core";
import { FormCreation, FormRequest, FormSettingsRequest, User } from "@/types";

export function useCreateForm() {
  const { mutate } = useCreate();
  const { data: identity } = useGetIdentity<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createForm = async (data: FormCreation) => {
    setLoading(true);
    setError(null);

    try {
      const jsonBlocks = JSON.stringify([
        {
          id: generateUniqueId(),
          blockType: "RowLayout",
          attributes: {},
          isLocked: true,
          childBlocks: [
            {
              id: generateUniqueId(),
              blockType: "Heading",
              attributes: {
                label: data.name || "forms.create.untitledForm",
                level: 1,
                fontSize: "4x-large",
                fontWeight: "normal",
              },
            },
            {
              id: generateUniqueId(),
              blockType: "Paragraph",
              attributes: {
                label: "Paragraph",
                text: data.description || "forms.create.untitledForm",
                fontSize: "small",
                fontWeight: "normal",
              },
            },
          ],
        },
      ]);

      const formSettings: FormSettingsRequest = {
        primaryColor: defaultPrimaryColor,
        backgroundColor: defaultBackgroundColor,
      };

      const form: FormRequest = {
        name: data.name,
        description: data.description,
        jsonBlocks,
        responses: 0,
        views: 0,
        published: false,
        creatorId: identity!.id,
        creatorName: identity!.userFullName || "",
        settings: formSettings,
      };

      mutate({
        resource: "forms",
        values: form,
      });

      setLoading(false);
      return {
        success: true,
        message: "Form created successfully",
        form,
      };
    } catch (e) {
      setLoading(false);
      setError("Something went wrong");
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };

  return { createForm, loading, error };
}
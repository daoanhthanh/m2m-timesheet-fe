import { generateUniqueId } from "@/utils";
import { defaultBackgroundColor, defaultPrimaryColor } from "@/utils/constants";
import {
  FormCreation,
  FormRequest,
  FormSettingsRequest,
  AuthUser,
} from "@/types";

export const createFormRequest = (data: FormCreation, creator: AuthUser) => {
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
    creatorId: creator.id,
    creatorName: creator.name || "",
    settings: formSettings,
  };

  return form;
};

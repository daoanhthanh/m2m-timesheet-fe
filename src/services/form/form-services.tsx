import { generateUniqueId } from "@/providers/utils";
import {
  defaultBackgroundColor,
  defaultPrimaryColor,
} from "@/providers/constants";
import { useCreate, useGetIdentity } from "@refinedev/core";
import { Form, User } from "@/types";

export async function createForm(data: { name: string; description: string }) {
  const { mutate } = useCreate();
  const { data: identity } = useGetIdentity<User>();

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

    const formSettings = {
      data: {
        primaryColor: defaultPrimaryColor,
        backgroundColor: defaultBackgroundColor,
      },
    };

    const form: Form = {
      // data: {
      name: data.name,
      description: data.description,
      userId: user.id,
      creatorName: user?.given_name || "",
      settingsId: formSettings.id,
      jsonBlocks,
      // },
    };

    mutate({
      resource: "forms",
      values: form,
    });

    if (!form) {
      return {
        success: false,
        message: "Could not create form, please try again",
      };
    }

    return {
      success: true,
      message: "Form created successfully",
      form,
    };
  } catch (e) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

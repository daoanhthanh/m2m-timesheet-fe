import { BaseResponse, Form, FormBlockInstance } from "types";
import { generateUniqueId } from "providers/uuid-v4";
import { useParams } from "react-router-dom";
import React, { createContext, useContext, useEffect, useState } from "react";
import { get } from "@/providers/http/request";
import { API_URL } from "providers/endpoints";

type FormBuilderContextType = {
  loading: boolean;
  formData: Form | null;
  setFormData: React.Dispatch<React.SetStateAction<Form | null>>;

  blockLayouts: FormBlockInstance[];
  setBlockLayouts: React.Dispatch<React.SetStateAction<FormBlockInstance[]>>;
  addBlockLayout: (blockLayout: FormBlockInstance) => void;

  removeBlockLayout: (id: string) => void;
  duplicateBlockLayout: (id: string) => void;

  selectedBlockLayout: FormBlockInstance | null;
  handleSelectedLayout: (blockLayout: FormBlockInstance | null) => void;

  updateBlockLayout: (id: string, childrenBlocks: FormBlockInstance[]) => void;

  repositionBlockLayout: (
    activeId: string,
    overId: string,
    position: "above" | "below",
  ) => void;

  insertBlockLayoutAtIndex: (
    overId: string,
    newBlockLayout: FormBlockInstance,
    position: "above" | "below",
  ) => void;

  updateChildBlock: (
    parentId: string,
    childBlockId: string,
    updatedBlock: FormBlockInstance,
  ) => void;
};

export const FormBuilderContext = createContext<FormBuilderContextType | null>(
  null,
);

export function BuilderContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { formId } = useParams<{ formId: string }>();

  console.log("querying formId", formId);

  const [formData, setFormData] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);

  const [blockLayouts, setBlockLayouts] = useState<FormBlockInstance[]>([]);

  const [selectedBlockLayout, setSelectedBlockLayout] =
    useState<FormBlockInstance | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!formId) return;

        const url = `${API_URL}/forms/${formId}`;

        const response = await get<BaseResponse<Form>>(url);

        //     await fetch(`http://localhost:8888/api/v1/forms/${formId}`, {
        //     method: "GET",
        //     credentials: "include"
        // });

        console.log(response);

        if (!response.isSuccess()) {
          throw new Error("Failed to fetch form");
        }

        const { data } = response.data();
        const form = data;

        document.title = `Form | ${form!.name}`;
        console.log("Dao Anh Thanh");
        if (form) {
          console.log(form, "form useEffect");
          setFormData(form);

          // Parse `blocks` from the form's `jsonBlocks`
          if (form.jsonBlocks) {
            const parsedBlocks = JSON.parse(form.jsonBlocks);
            setBlockLayouts(parsedBlocks);
          }
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formId]);

  const addBlockLayout = (blockLayout: FormBlockInstance) => {
    setBlockLayouts((prev) => {
      const updatedBlock = [...prev];
      updatedBlock.push(blockLayout);
      return updatedBlock;
    });
  };

  // B.S -> DUPLICATE BLOCK LAYOUT
  const duplicateBlockLayout = (id: string) => {
    setBlockLayouts((prevBlocks) => {
      const blockToDuplicate = prevBlocks.find((block) => block.id === id);
      if (!blockToDuplicate) return prevBlocks;
      // Deep clone the block and generate a new id

      const duplicatedLayoutBlock = {
        ...blockToDuplicate,
        id: `layout-${generateUniqueId()}`,
        childBlocks: blockToDuplicate.childBlocks?.map((childBlock) => ({
          ...childBlock,
          id: generateUniqueId(),
        })),
      };

      // Add the duplicated block after the original block
      const updatedBlockLayouts = [...prevBlocks];
      const insertIndex = prevBlocks.findIndex((block) => block.id === id) + 1;
      updatedBlockLayouts.splice(insertIndex, 0, duplicatedLayoutBlock);

      return updatedBlockLayouts;
    });
  };

  // B.S -> REMOVE BLOCK LAYOUT
  const removeBlockLayout = (id: string) => {
    setBlockLayouts((prev) => prev.filter((block) => block.id !== id));
    if (selectedBlockLayout?.id === id) setSelectedBlockLayout(null);
  };

  const handleSelectedLayout = (blockLayout: FormBlockInstance | null) => {
    setSelectedBlockLayout(blockLayout);
  };

  // B.S -> REPOSTION BLOCK LAYOUT
  const repositionBlockLayout = (
    activeId: string,
    overId: string,
    position: "above" | "below",
  ) => {
    setBlockLayouts((prev) => {
      // Find the indices of the active and over blocks
      const activeIndex = prev.findIndex((block) => block.id === activeId);
      const overIndex = prev.findIndex((block) => block.id === overId);

      if (activeIndex === -1 || overIndex === -1) {
        console.warn("Active or Over block not found.");
        return prev;
      }

      // Remove the active block from its current position
      const updatedBlocks = [...prev];
      const [movedBlock] = updatedBlocks.splice(activeIndex, 1);
      // Calculate the new position for insertion
      const insertIndex = position === "above" ? overIndex : overIndex + 1;
      // Insert the moved block at the calculated position
      updatedBlocks.splice(insertIndex, 0, movedBlock);

      return updatedBlocks;
    });
  };

  // B.S -> INSERT NEW LAYOUT IN A PARTICULAR INDEX ON CANVAS
  const insertBlockLayoutAtIndex = (
    overId: string,
    newBlockLayout: FormBlockInstance,
    position: "above" | "below",
  ) => {
    setBlockLayouts((prev) => {
      const overIndex = prev.findIndex((block) => block.id === overId);
      if (overIndex == -1) {
        return prev;
      }

      const insertIndex = position === "above" ? overIndex : overIndex + 1;
      const updatedBlocks = [...prev];
      updatedBlocks.splice(insertIndex, 0, newBlockLayout);
      return updatedBlocks;
    });
  };

  const updateBlockLayout = (
    id: string,
    childrenBlocks: FormBlockInstance[],
  ) => {
    setBlockLayouts((prev) =>
      prev.map((block) =>
        block.id === id
          ? {
              ...block,
              childBlocks: childrenBlocks,
            }
          : block,
      ),
    );
  };

  const updateChildBlock = (
    parentId: string,
    childBlockId: string,
    updatedBlock: FormBlockInstance,
  ) => {
    setBlockLayouts((prevBlocks) => {
      return prevBlocks.map((parentBlock) => {
        if (parentBlock.id === parentId) {
          const updatedChildBlocks = parentBlock.childBlocks?.map(
            (childBlock) =>
              childBlock.id === childBlockId
                ? { ...childBlock, ...updatedBlock }
                : childBlock,
          );
          return { ...parentBlock, childBlocks: updatedChildBlocks };
        }

        return parentBlock;
      });
    });
  };

  return (
    <FormBuilderContext.Provider
      value={{
        loading,
        formData,
        setFormData,
        blockLayouts,
        setBlockLayouts,
        addBlockLayout,
        removeBlockLayout,
        duplicateBlockLayout,
        selectedBlockLayout,
        handleSelectedLayout,
        repositionBlockLayout,
        insertBlockLayoutAtIndex,
        updateBlockLayout,
        updateChildBlock,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
}

export function useFormBuilder() {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error("Use Context inside the provider");
  }
  return context;
}

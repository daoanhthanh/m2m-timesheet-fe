import React from "react";
import { FormBlockInstance } from "types";
import { FormBlocks } from "types";

const ChildCanvasComponentWrapper = ({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) => {
  const CanvasComponent = FormBlocks[blockInstance.blockType]?.canvasComponent;
  if (!CanvasComponent) return null;

  return <CanvasComponent blockInstance={blockInstance} />;
};

export default ChildCanvasComponentWrapper;

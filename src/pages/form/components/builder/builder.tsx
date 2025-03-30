import React from "react";
import { BuilderSidebar } from "./sidebar";
import { SidebarInset, SidebarTrigger } from "./builder-sidebar";
import { defaultBackgroundColor } from "@/providers/constants";
import { BuilderBlockProperties } from "@/components/form-builder";

export const Builder = (props: { isSidebarOpen: boolean }) => {
  return (
    <>
      <BuilderSidebar />
      <SidebarInset className="!p-0 flex-1">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: defaultBackgroundColor,
          }}
        >
          <SidebarTrigger className=" absolute top-0 z-50" />
          {/*<BuilderCanvas />*/}
          {/*<FloatingShareButton isSidebarOpen={props.isSidebarOpen} />*/}
        </div>
      </SidebarInset>
      <BuilderBlockProperties />
    </>
  );
};

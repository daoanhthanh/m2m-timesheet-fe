import { useFormBuilder } from "@/hooks";
import React, { useState } from "react";
import { Sidebar, SidebarContent } from "./sidebar-components";
import { cn } from "@/providers/utils";
import FormBlockBox from "@/pages/form/components/builder/form-block-box";
import FormSettings from "@/pages/form/components/builder/form-settings";
import { Drawer, Layout } from "antd";
import { PanelLeft } from "lucide-react";

import DrawerPanel from "antd/es/drawer/DrawerPanel";

export const FormBuilderSidebar = ({
  rest,
}: {
  rest?: React.ComponentProps<typeof Sidebar>;
}) => {
  const { formData } = useFormBuilder();
  const { Sider, Content } = Layout;

  const [tab, setTab] = useState<"blocks" | "settings">("blocks");

  return (
    <Sider
      collapsible
      collapsedWidth={0}
      trigger={<PanelLeft />}
      className="h-full bg-transparent"
      width="var(--sidebar-width)"
    >
      {/*<SidebarHeader className="bg-white px-0">*/}
      {/*  <header*/}
      {/*      className="border-b border-gray-200*/}
      {/*w-full pt-1 pb-2 flex shrink-0 items-center gap-2*/}
      {/*"*/}
      {/*  >*/}
      {/*      <div className="flex items-center gap-2 px-4">*/}
      {/*          <Home className="-ml-1 w-4 h-4" />*/}
      {/*          <Separator orientation="vertical" className="mr-2 h-4" />*/}
      {/*          <Breadcrumb>*/}
      {/*              <BreadcrumbList>*/}
      {/*                  <BreadcrumbItem className="hidden md:block">*/}
      {/*                      <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>*/}
      {/*                  </BreadcrumbItem>*/}
      {/*                  <BreadcrumbSeparator className="hidden md:block" />*/}
      {/*                  <BreadcrumbItem>*/}
      {/*                      <BreadcrumbPage className="flex items-center gap-1">*/}
      {/*                          <FileTextIcon className="w-4 h-4 mb-[3px]" />*/}
      {/*                          <h5 className="truncate flex w-[110px] text-sm">*/}
      {/*                              {formData?.name || "Untitled"}*/}
      {/*                          </h5>*/}
      {/*                      </BreadcrumbPage>*/}
      {/*                  </BreadcrumbItem>*/}
      {/*              </BreadcrumbList>*/}
      {/*          </Breadcrumb>*/}
      {/*      </div>*/}
      {/*  </header>*/}
      {/*</SidebarHeader>*/}
      <SidebarContent className="p-5 bg-white h-full">
        <div className="w-full flex flex-row gap-1 h-[39px] rounded-full bg-gray-100 p-1">
          <button
            className={cn(
              `p-[5px] flex-1 bg-transparent
                transition-colors
                ease-in-out rounded-full text-center
                font-medium text-sm text-gray-400`,
              {
                "bg-white text-gray-600": tab === "blocks",
              },
            )}
            onClick={() => setTab("blocks")}
          >
            Blocks
          </button>
          <button
            className={cn(
              `p-[5px] flex-1 bg-transparent
                transition-colors
                ease-in-out rounded-full text-center
                font-medium text-sm text-gray-400`,
              {
                "bg-white text-gray-600": tab === "settings",
              },
            )}
            onClick={() => setTab("settings")}
          >
            Settings
          </button>
        </div>
        {/* {Form Blocks} */}
        {tab === "blocks" && <FormBlockBox />}
        {/* {Form Settings} */}
        {tab === "settings" && <FormSettings />}
      </SidebarContent>
    </Sider>
  );
};

import * as React from "react";
import { Tooltip as AntdTooltip } from "antd";
import { cn } from "@/providers/utils";

const TooltipProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

const Tooltip = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) => <AntdTooltip title={title}>{children}</AntdTooltip>;

const TooltipTrigger = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  { className?: string; title: React.ReactNode; children: React.ReactNode }
>(({ className, title, children }, rf) => (
  <AntdTooltip
    title={title}
    overlayClassName={cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground",
      className,
    )}
  >
    <div>{children}</div>
  </AntdTooltip>
));
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

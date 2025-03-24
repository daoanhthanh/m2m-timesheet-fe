import * as React from "react"
import { Popover as AntdPopover } from "antd"

import { cn } from "providers/lib"

const Popover = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof AntdPopover>) => (
  <AntdPopover {...props}>{children}</AntdPopover>
)

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
))
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverAnchor = ({ children }: { children: React.ReactNode }) => <>{children}</>

const PopoverContent = ({
  content,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AntdPopover>) => (
  <Popover content={<div className={cn("p-4", className)}>{content}</div>} {...props} />
)

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

import * as React from "react";
import { Drawer } from "antd";
import { X } from "lucide-react";
import { cn } from "@/utils";

// Replace SheetPrimitive with Drawer
const Sheet = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <Drawer open={open} onClose={onClose} closable={false}>
    {children}
  </Drawer>
);

const SheetTrigger = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => <button onClick={onClick}>{children}</button>;

const SheetClose = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </button>
);

const SheetContent = ({
  side = "right",
  className,
  children,
  ...props
}: {
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn(`sheet-content-${side}`, className)} {...props}>
    {children}
  </div>
);

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);

const SheetTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
);

const SheetDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

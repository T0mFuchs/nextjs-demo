import * as I from "@radix-ui/react-accessible-icon";

export function AccessibleIcon({ children, label, ...props }: { children: React.ReactNode, label: string }) {
  return <I.Root label={label} {...props}>{children}</I.Root>;
}
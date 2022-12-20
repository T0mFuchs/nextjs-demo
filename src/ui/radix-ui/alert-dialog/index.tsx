import React from "react";
import * as A from "@radix-ui/react-alert-dialog";
import { motion, AnimatePresence } from "framer-motion";


import css from "./index.module.scss";

export default function AlertDialog({
  children,
  open,
  onOpenChange,
  className,
  position,
  style,
  width,
  ...props
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  position?: string; // overwrite position of component via css modules
  style?: React.CSSProperties;
  width?: number | string; // set a fixed width for the component so it is easier to be dismissed
}) {
  return (
    <A.Root open={open} onOpenChange={onOpenChange}>
      <A.Portal
        className={`${position}`}
        style={{ width: width, margin: "0 auto" }}
      >
        <A.Overlay className={css.Overlay} />
        <A.Content>
          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0, 0.2, 0.5, 1.01] }}
              >
                <div
                  className={`${css.dialog} ${className}`}
                  style={{ ...style }}
                  {...props}
                >
                  {children}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </A.Content>
      </A.Portal>
    </A.Root>
  );
}

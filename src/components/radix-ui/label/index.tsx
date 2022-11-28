import React from "react";
import * as L from "@radix-ui/react-label";

export function Label({ htmlFor, style }: { htmlFor: string; style?: React.CSSProperties }) {
  return <L.Root htmlFor={htmlFor} style={style}/>;
}

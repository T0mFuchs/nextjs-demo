import React from "react";
import * as L from "@radix-ui/react-label";

const Label = ({
  htmlFor,
  style,
  ...props
}: {
  htmlFor: string;
  style?: React.CSSProperties;
}) => {
  return <L.Root htmlFor={htmlFor} style={style} {...props} />;
};

export default Label;

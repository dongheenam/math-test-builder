import React from "react";
import classNames from "classnames";

export type AnchorProps = React.ComponentPropsWithoutRef<"a"> & {
  blank: boolean;
};

export function Anchor({
  blank = false,
  className,
  children,
  ...props
}: AnchorProps) {
  const anchorProps = {
    ...props,
    target: blank ? "_blank" : undefined,
    rel: blank ? "noreferrer" : undefined,
    className: classNames("anchor", className),
  };
  return <a {...anchorProps}>{children} </a>;
}

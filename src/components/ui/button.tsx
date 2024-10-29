import { type VariantProps, cva } from "class-variance-authority";
import { type ElementType } from "react";

import { cn } from "@/lib/utils";
import { type PolymorphicPropsWithoutRef } from "../../../types/polymorphic";

const variants = cva(
  "inline-flex items-center transition justify-center whitespace-nowrap rounded-full px-4 py-2 outline-none",
  {
    variants: {
      variant: {
        primary: "hover:bg-primary-600 bg-primary text-white",
        secondary: "bg-zinc-800 text-white hover:bg-slate-700",
        tertiary: "text-zinc-800 hover:bg-zinc-200",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export const Button = <T extends ElementType = "button">({
  as,
  children,
  variant,
  className,
  ...rest
}: PolymorphicPropsWithoutRef<VariantProps<typeof variants>, T>) => {
  const Element: ElementType = as || "button";

  return (
    <Element className={cn(variants({ variant, className }))} {...rest}>
      {children}
    </Element>
  );
};

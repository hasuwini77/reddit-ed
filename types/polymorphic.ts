import type {
  ComponentPropsWithoutRef,
  ElementType,
  JSX,
  PropsWithoutRef,
} from "react";

type Merge<T, U> = Omit<T, keyof U> & U;
type PropsWithAs<P, T extends ElementType> = P & { as?: T };

export type PolymorphicPropsWithoutRef<P, T extends ElementType> = Merge<
  T extends keyof JSX.IntrinsicElements
    ? PropsWithoutRef<JSX.IntrinsicElements[T]>
    : ComponentPropsWithoutRef<T>,
  PropsWithAs<P, T>
>;

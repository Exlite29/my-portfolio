"use client";
//@ts-check
import { GlobalProvider } from "./GlobalProvider";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return <GlobalProvider>{children}</GlobalProvider>;
}

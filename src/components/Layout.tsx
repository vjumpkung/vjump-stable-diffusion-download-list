import { kanit } from "@/pages/_app";
import { ReactNode } from "react";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className={`container mx-auto ${kanit.className}`}>{children}</main>
    </>
  );
}

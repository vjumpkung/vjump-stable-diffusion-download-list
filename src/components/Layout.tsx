import { inter } from "@/pages/_app";
import { ReactNode } from "react";
import Header from "./Header";
import { ThemeProvider } from "./theme-provider";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <main className={`container mx-auto ${inter.className}`}>
          {children}
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
}

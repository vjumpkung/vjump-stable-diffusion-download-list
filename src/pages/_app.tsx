import "@/styles/globals.css";
import { PublicEnvScript } from "next-runtime-env";
import type { AppProps } from "next/app";
import { Inter, Kanit } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PublicEnvScript />
      <Component {...pageProps} />
    </>
  );
}

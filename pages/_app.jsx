import "@/styles/globals.css";
import "@/styles/fonts.css";
import { Lora } from "next/font/google";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/next';

const lora = Lora({
  subsets: ["latin"], // Adjust subsets as needed
  weight: ["400", "700"], // Specify font weights
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={lora.className}>
        <Component {...pageProps} />
        <Analytics />
      </main>

    </>
  );
}

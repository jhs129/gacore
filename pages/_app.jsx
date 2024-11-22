import "@/styles/globals.css";
import "@/styles/fonts.css";
import { Lora } from "next/font/google";
import Head from "next/head";

const lora = Lora({
  subsets: ["latin"], // Adjust subsets as needed
  weight: ["400", "700"], // Specify font weights
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/wmh5yzy.css" />
      </Head>
      <main className={lora.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

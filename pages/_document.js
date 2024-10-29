import { Html, Head, Main, NextScript } from "next/document";
import { DOMAIN } from "@/config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="monetag" content="4b52a70de2c36cafa05d9bf9204222a5" />
        <link rel="icon" href={`${DOMAIN}/favicon.ico`} sizes="any" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

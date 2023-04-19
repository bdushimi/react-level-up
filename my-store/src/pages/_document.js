import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="<https://app.snipcart.com>" />
        <link rel="preconnect" href="<https://cdn.snipcart.com>" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js"></script>
        <div hidden id="snipcart" data-api-key="ODQyMmI3NDMtN2UwYy00ZWJjLWI4OWEtZWQ4NGM2YmYzNGYwNjM4MTc0OTQ0NzA3NzU4MzA4" data-config-modal-style="side"></div>
      </body>
    </Html>
  );
}

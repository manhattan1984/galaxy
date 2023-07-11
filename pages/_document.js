import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import React from "react";

const Document = () => {
  return (
    <Html>
      <Head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&family=Raleway&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="Galaxydholdings.png" />
      </Head>
      <body>
        <Main />
        <NextScript />


        <Script
        strategy="afterInteractive"
        src="//code.tidio.co/hrtzvetfvkemfpywgicjsponegkkv1uq.js"
        async
      /> 
      </body>
    </Html>
  );
};

export default Document;

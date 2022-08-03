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
          href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&family=Raleway&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="zipo-aid.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          id="chatBot"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/62e05ecb54f06e12d88b7ed7/1g8u74jh6';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();`,
          }}
        />
      </body>
    </Html>
  );
};

export default Document;

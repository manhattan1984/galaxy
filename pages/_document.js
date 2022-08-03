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
          id="chatBot"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `<!--Start of Tawk.to Script-->
            <script type="text/javascript">
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/62eaf8ab37898912e9611b16/1g9itmoft';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
            </script>
            <!--End of Tawk.to Script-->`,
          }}
        />
      </body>
    </Html>
  );
};

export default Document;

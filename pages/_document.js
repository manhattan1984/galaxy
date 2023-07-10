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
        <Script>
        {`
var _smartsupp = _smartsupp || {};
_smartsupp.key = '0be2be1b211175259e856d18357003e5964564c6';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);
`}
      </Script>
      </body>
    </Html>
  );
};

export default Document;

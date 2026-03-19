import "./globals.css";
import "@/styles/Style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { roboto, anton, quattro } from './fonts';
//import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import Script from "next/script";

import { GoogleAnalytics } from '@next/third-parties/google'
export const metadata = {
  title: "Genrobotics | Robotics & AI Solutions for Sanitation, Healthcare & Industrial Sectors",
  description: "Genrobotics develops robotics and AI solutions across sanitation, healthcare, oil & gas, and research, delivering safe, reliable, and efficient operations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" sizes="48x48" />
        <meta name="msvalidate.01" content="1F80B934032F619762C19EE278BDA3CE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": "https://www.genrobotics.com/",
              "logo": "https://www.genrobotics.com/favicon.ico",
              "subOrganization": [
                {
                  "@type": "Organization",
                  "name": "Sanitation",
                  "url": "https://www.sanitation.genrobotics.com"
                },
                {
                  "@type": "Organization",
                  "name": "Medical and Mobility",
                  "url": "https://www.medical.genrobotics.com"
                },
                {
                  "@type": "Organization",
                  "name": "Research and Development",
                  "url": "https://www.research.genrobotics.com"
                },
                {
                  "@type": "Organization",
                  "name": "Genrobotics Foundation",
                  "url": "https://www.genroboticsfoundation.com"
                }
              ]
            }),
          }}
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SJJ43HQWRD"></Script>
        <Script>
          {`
          window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SJJ43HQWRD');
          `}
        </Script>
      </head>
      <body className={`${roboto.variable} ${anton.variable} ${quattro.variable} bg-black font-roboto`}>
        {/* <SplashScreen /> */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MRRDCDD"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <GoogleAnalytics id="G-QVTRG6X663" />
        <Navbar />
        <main className="pt-24 sm:pt-28 lg:pt-32">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
} 
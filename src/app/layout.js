import "./globals.css";
import "@/styles/Style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { roboto, anton, quattro } from './fonts';
//import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";

export const metadata = {
  title: "Genrobotics | Robotics & AI Solutions for Sanitation, Healthcare & Industrial Sectors",
  description: "Genrobotics develops robotics and AI solutions across sanitation, healthcare, oil & gas, and research, delivering safe, reliable, and efficient operations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon_xmas.ico" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="48x48" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "url": "https://genrobotics.com/",
              "logo": "https://genrobotics.com/favicon.ico",
            }),
          }}
        />
      </head>
      <body className={`${roboto.variable} ${anton.variable} ${quattro.variable} bg-black font-roboto`}>
        {/* <SplashScreen /> */}
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
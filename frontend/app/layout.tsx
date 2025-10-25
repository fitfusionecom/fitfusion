import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import PrimaryLayout from "@/components/layouts/primary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fit Fusion Ayurveda",
  description: "Fit Fusion Ayurveda",
  keywords: ["Fit Fusion Ayurveda", "Ayurveda", "Ayurvedic Products"],
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M4FJ9KSQ');
          `}
        </Script>
        {/* End Google Tag Manager */}
        {/* End Meta Pixel Code */}
        {/* Template CSS */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/assets/css/product-card-enhanced.css" />
        <link rel="stylesheet" href="/homepage/css/style.css" />
        <link rel="stylesheet" href="/homepage/css/responsive.css" />
        <link rel="stylesheet" href="/homepage/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/homepage/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/homepage/css/select2.min.css" />
        <link rel="stylesheet" href="/homepage/css/flatpickr.min.css" />
        <link rel="stylesheet" href="/homepage/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/homepage/css/custom.css" />
        <link rel="stylesheet" href="/homepage/css/animate.css" />
        <link rel="stylesheet" href="/homepage/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/login-form.css" />
        <link rel="stylesheet" href="/assets/css/swiper-custom.css" />

        {/* Google Fonts - Updated to include all fonts used in the project */}
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M4FJ9KSQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <PrimaryLayout>{children}</PrimaryLayout>
      </body>
    </html>
  );
}

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

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1130757668714361');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1130757668714361&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-42YDYGV4BG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-42YDYGV4BG');
          `}
        </Script>

        <PrimaryLayout>{children}</PrimaryLayout>
      </body>
    </html>
  );
}

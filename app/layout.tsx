import "@/styles/globals.scss";

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FC, ReactNode } from "react";

import Notification from "@/components/Notification";
import AuthProvider from "@/providers/AuthProvider";
import RecoilRootWrapper from "@/store/RecoilRootWrapper";
import StyledComponentsRegistry from "@/styles/registry";
import { SITE_BASE_URL } from "@/utilities/constants";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = ({ children }) => (
  <html lang="en" className={plusJakartaSans.variable}>
    <RecoilRootWrapper>
      <body suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <AuthProvider>
            <Notification />
            {children}
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </RecoilRootWrapper>
  </html>
);

export default RootLayout;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_BASE_URL),
  title: "National Science Events",
  applicationName: "National Science Events",
  authors: {
    name: "ncrst",
    url: SITE_BASE_URL,
  },
  referrer: "origin",
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/assets/favicon.ico",
    shortcut: "/assets/favicon.ico",
    apple: "/assets/daaily-icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_BASE_URL,
    title: "National Science Events",
    siteName: "National Science Events",
  },
  twitter: {
    card: "summary_large_image",
    title: "National Science Events",
  },
  assets: `${SITE_BASE_URL}/assets/`,
};

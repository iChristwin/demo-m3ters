import React from "react";
import { M3terHead } from "m3ters";
import { getFrameMetadata } from "@coinbase/onchainkit";

const frameMetadata = getFrameMetadata({
  buttons: [{ label: "Create" }],
  input: { text: "your text here" },
  image: `http://m3ters.ichristwin.com/api/m3ter-head/${undefined}`,
  post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
});

export const metadata = {
  metadataBase: new URL("https://m3ters.ichristwin.com"),
  title: "Demo m3ters",
  description: "A simple webpage to demonstrate them m3ters.js project",
  generator: "m3ters.js",
  applicationName: "m3ters.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "m3ters.js",
    "m3ters",
    "m3tering",
    "m3tering protocol",
    "avatar",
    "SVG",
    "alias",
    "ichristwin",
  ],
  authors: [{ name: "ichristwin", url: "https://ichristwin.com" }],
  creator: "ichristwin",
  publisher: "ichristwin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Demo m3ters",
    description: "A simple webpage to demonstrate them m3ters.js project",
    url: "https://m3ters.ichristwin.com",
    siteName: "m3ters.js",
    images: [
      {
        url: "https://m3ters.ichristwin.com/opengraph-image.png",
        width: 500,
        height: 500,
        alt: "More Smiley nanobot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "website",
    title: "Demo m3ters",
    description: "A simple webpage to demonstrate them m3ters.js project",
    site: "@ichristwin",
    creator: "@ichristwin",
    images: {
      url: "https://m3ters.ichristwin.com/opengraph-image.png",
      alt: "More Smiley nanobot",
    },
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return <M3terHead seed={undefined} />;
}

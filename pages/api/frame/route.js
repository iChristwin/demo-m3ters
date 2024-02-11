import React from "react";
import { M3terHead } from "m3ters";

async function getResponse(req) {
  const ReactDOMServer = (await import("react-dom/server")).default;
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex;
  let seed = undefined;

  if (buttonId === 1) {
    seed = data.untrustedData.inputText;
  } else if (buttonId === 2) {
    seed = data.untrustedData.fid;
  } else if (buttonId === 3) {
    const buffer = new Uint8Array(20);
    crypto.getRandomValues(buffer);
    seed = Array.from(buffer)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  } else {
    seed = undefined;
  }

  return new NextResponse(`<!DOCTYPE html><html><head>
    <title>This is frame 7</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="data:image/svg+xml;utf8,${encodeURIComponent(
      ReactDOMServer.renderToString(<M3terHead seed={seed} />)
    )}" />
    <meta property="fc:frame:button:1" content="use input👆" />
    <meta property="fc:frame:button:2" content="use my FID" />
    <meta property="fc:frame:button:3" content="surprise me" />
    <meta property="fc:frame:button:4" content="mint?" />
    <meta property="fc:frame:post_url" content="${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/frame?seed=${seed}" />
  </head></html>`);
}

export async function POST(req) {
  return getResponse(req);
}

export const dynamic = "force-dynamic";

import React from "react";

import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import { getTokenUrl } from "frames.js";

const reducer = (state, action) => {
  const buttonId = action.postBody?.untrustedData.buttonIndex
    ? action.postBody?.untrustedData.buttonIndex
    : undefined;

  switch (buttonId) {
    case 1:
      return { seed: action.postBody?.untrustedData.inputText };
    case 2:
      return { seed: action.postBody?.untrustedData.fid };
    case 3:
      const buffer = new Uint8Array(20);
      crypto.getRandomValues(buffer);
      return {
        seed: Array.from(buffer)
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join(""),
      };
    default:
      return { seed: "" };
  }
};

// This is a react server component only
export default async function Home({ params, searchParams }) {
  const previousFrame = getPreviousFrame(searchParams);
  const [state, dispatch] = useFramesReducer(
    reducer,
    { seed: "" },
    previousFrame
  );

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT

  // then, when done, return next frame
  return (
    <div className="p-4">
      <FrameContainer
        postUrl="/frames"
        state={state}
        pathname="/frame"
        previousFrame={previousFrame}
      >
        <FrameImage
          src={`https://m3ters.ichristwin.com/api/m3ter-head/${state.seed}`}
        />
        <FrameInput text="put some text here" />
        <FrameButton>use input👆</FrameButton>
        <FrameButton>use my FID</FrameButton>
        <FrameButton>surprise me!</FrameButton>
        <FrameButton action="link" target={`https://m3ters.ichristwin.com`}>More</FrameButton>
      </FrameContainer>
    </div>
  );
}

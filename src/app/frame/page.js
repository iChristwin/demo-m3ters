import React from "react";

import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  getPreviousFrame,
  useFramesReducer,
  getFrameMessage,
} from "frames.js/next/server";
import { getTokenUrl } from "frames.js";

export const HOST = process.env["NEXT_PUBLIC_HOST"] || "http://localhost:3000";
export const LOCAL_STORAGE_KEYS = {
  FARCASTER_USER: "farcasterUser",
};

/** WARNING: This is a mock hub for development purposes only that does not verify signatures */
export const DEBUG_HUB_OPTIONS = {
  hubHttpUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/debug/hub"
      : undefined,
};

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
      return {
        seed: "",
      };
  }
};

// This is a react server component only
export default async function Home({ params, searchParams }) {
  const previousFrame = getPreviousFrame(searchParams);
  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    ...DEBUG_HUB_OPTIONS,
  });

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error("Invalid frame payload");
  }

  const [state, dispatch] = useFramesReducer(
    reducer,
    { seed: "" },
    previousFrame
  );

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT

  console.log("info: state is:", state);

  if (frameMessage) {
    const {
      isValid,
      buttonIndex,
      inputText,
      castId,
      requesterFid,
      casterFollowsRequester,
      requesterFollowsCaster,
      likedCast,
      recastedCast,
      requesterVerifiedAddresses,
      requesterUserData,
    } = frameMessage;

    console.log("info: frameMessage is:", frameMessage);
  }

  // then, when done, return next frame
  return (
    <div className="p-4">
      <FrameContainer
        postUrl="/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage
          src={`http://m3ters.ichristwin.com/api/m3ter-head/${state.seed}`}
        />
        <FrameInput text="put some text here" />
        <FrameButton>use input👆</FrameButton>
        <FrameButton>use my FID</FrameButton>
        <FrameButton>surprise me</FrameButton>
        <FrameButton
          action="mint"
          target={getTokenUrl({
            address: "0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df",
            tokenId: "123",
            chainId: 7777777,
          })}
        >
          Mint
        </FrameButton>
      </FrameContainer>
    </div>
  );
}

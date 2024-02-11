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

const reducer = (state, action) => {
  const buttonId = action.postBody?.untrustedData.buttonIndex
    ? action.postBody?.untrustedData.buttonIndex
    : undefined;

  let _seed_ = undefined;

  switch (buttonId) {
    case 1:
      _seed_ = action.postBody?.untrustedData.inputText
        ? action.postBody?.untrustedData.inputText
        : undefined;
      break;
    case 2:
      _seed_ = action.postBody?.untrustedData.fid
        ? action.postBody?.untrustedData.fid
        : undefined;
      break;
    case 3:
      const buffer = new Uint8Array(20);
      crypto.getRandomValues(buffer);
      _seed_ = Array.from(buffer)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      break;
    default:
      _seed_ = undefined;
  }

  return {
    seed: _seed_,
  };
};

// This is a react server component only
export default async function Home({ params, searchParams }) {
  const previousFrame = getPreviousFrame(searchParams);
  const frameMessage = await getFrameMessage(previousFrame.postBody);

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error("Invalid frame payload");
  }

  const [state, dispatch] = useFramesReducer(
    reducer,
    { seed: undefined },
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
        <FrameImage>
          <img
            src={`http://m3ters.ichristwin.com/api/m3ter-head/${state.seed}`}
          />
        </FrameImage>

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

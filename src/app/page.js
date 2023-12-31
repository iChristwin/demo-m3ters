"use client";
import { M3terAlias, M3terHead } from "m3ters";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Button, Input } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import ReactGA from "react-ga4";

ReactGA.initialize("G-YXPE6R7SZG");
ReactGA.send({ hitType: "pageview", page: "/", title: "Demo m3ters" });

export default function Home() {
  const [showSmallScreenMessage, setShowSmallScreenMessage] = useState(false);

  useEffect(() => {
    setShowSmallScreenMessage(window.innerWidth < 600);
  }, []);

  const [seed, setSeed] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  let intervalId;

  useEffect(() => {
    if (isPlaying) {
      intervalId = setInterval(() => {
        const buffer = new Uint8Array(20);
        crypto.getRandomValues(buffer);
        const randomHex = Array.from(buffer)
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");
        setSeed("0x" + randomHex);
      }, 450);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <NextUIProvider>
      <main
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center bottom",
          backgroundImage: "url('./Untitled Project 9.tif.webp",
        }}
      >
        <div className="bg-gradient-to-b from-gray-900/75 to-black flex min-h-screen flex-col items-center justify-between p-9">
          <div className="z-10 max-w-7xl w-full items-center justify-end font-mono text-sm lg:flex">
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none">
              <a
                className="pointer-events-none text-white flex place-items-center justify-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://www.npmjs.com/package/m3ters"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="block grid-cols-2">
                  <h1 className="text-4xl font-semibold">m3ters.js</h1>
                  <p className="bold">By ichristwin</p>
                </span>
              </a>
            </div>
          </div>
          {showSmallScreenMessage ? (
            <p
              style={{ marginBottom: "300px" }}
              className="font-mono text-3xl font-semibold text-neutral-300"
            >
              This page is best viewed on a larger screen. Please revisit later!
            </p>
          ) : (
            <>
              <div style={{ paddingTop: "150px", paddingBottom: "50px" }}>
                <div className="grid grid-cols-1 place-items-center justify-center">
                  <div className=" bg-gray-500/25 rounded-full px-4">
                    <h2 className="capitalize text-neutral-300 text-2xl font-semibold">
                      <M3terAlias seed={seed} />
                    </h2>
                  </div>
                  <M3terHead seed={seed} />
                </div>
                <div className="flex text-neutral-300 place-items-center gap-3">
                  <Input
                    style={{ borderWidth: "0px" }}
                    value={seed}
                    onChange={(event) => setSeed(event.target.value)}
                    id="seedInput"
                    placeholder="Type to generate..."
                    className="dark"
                    classNames={{
                      input: [
                        "bg-transparent",
                        "text-black/90 dark:text-neutral-300/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-neutral-300/60",
                      ],
                      innerWrapper: "bg-transparent",
                      inputWrapper: [
                        "shadow-xl",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/30",
                        "dark:hover:bg-default/30",
                        "group-data-[focused=true]:bg-default-200/50",
                        "dark:group-data-[focused=true]:bg-default/60",
                        "!cursor-text",
                      ],
                    }}
                  />
                  OR
                  <Button
                    color="primary"
                    variant="ghost"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? "Stop" : "Randomize"}
                  </Button>
                </div>
              </div>
              <ReactPlayer
                url="https://music.youtube.com/playlist?list=PL0HcRLHfAYKAk0Dfzlgo1-OgQC-O1I9Ab&si=K1EXAE06PU-KrpsC"
                playing={isPlaying}
                width="0%"
                height="0px"
                loop={true}
                volume={0.7}
                controls={false}
              />
              <div className="mb-32 grid text-neutral-300 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <a
                  href="https://github.com/iChristwin/m3ters.js"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    GitHub{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Find in-depth information about m3ter.js features and API.
                  </p>
                </a>
                <a
                  href="https://www.npmjs.com/package/m3ters"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors  hover:border-neutral-700 hover:bg-neutral-800 hover:bg-opacity-30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    Install{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    To install m3ters.js <br />
                    <code style={{ backgroundColor: "#444" }}>
                      npm i m3ters --save
                    </code>
                  </p>
                </a>
                <a
                  href="https://m3tering.whynotswitch.com"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    About{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Learn more about the M3tering Protocol, read the docs.
                  </p>
                </a>
                <a
                  href="https://discord.gg/Z4AyRjh7gW"
                  className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    Join{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Join the discord to connect with other{" "}
                    <code style={{ backgroundColor: "#444" }}>m3ter-heads</code>
                  </p>
                </a>
              </div>
            </>
          )}
        </div>
      </main>
    </NextUIProvider>
  );
}

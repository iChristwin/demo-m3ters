import React from "react";
import Irys from "@irys/sdk";
import Arweave from "arweave";

const IMAGE_TAGS = [
  { name: "application-id", value: "m3ter-head" },
  { name: "Content-Type", value: "image/png" },
];
const METADATA_TAGS = [
  { name: "application-id", value: "m3ter-head" },
  { name: "Content-Type", value: "application/json" },
];
const AR_GATEWAY_URL = "https://arweave.net";

export default async (req, res) => {
  const { pngBase64, name, seed, tokenId } = req.body;
  const imgBuffer = Buffer.from(pngBase64, "base64");
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });

  const irys = new Irys({
    token: "arweave",
    url: "https://node2.irys.xyz",
    key: await arweave.wallets.generate(),
  });

  const imageReceipt = await irys.upload(imgBuffer, {tags: IMAGE_TAGS });
  const imageReceiptId = imageReceipt.id;
  console.log(`Data uploaded ==> ${AR_GATEWAY_URL}/${imageReceiptId}`);

  const nftMetadata = {
    name,
    description: `M3ter-Head #${tokenId} has escaped the code; algorithmically spawned from the seed: ${seed}`,
    image: `${AR_GATEWAY_URL}/${imageReceiptId}`,
    attributes: [
      {
        trait_type: "tokenId",
        value: tokenId,
      },
      {
        trait_type: "seed",
        value: seed,
      },
      {
        trait_type: "src",
        value: "m3ters@1.0.3",
      },
    ],
  };

  const metaDataString = JSON.stringify(nftMetadata);
  const metadataReceipt = await irys.upload(metaDataString, {tags: METADATA_TAGS });
  console.log(`Data uploaded ==> ${AR_GATEWAY_URL}/${metadataReceipt.id}`);
  res.setHeader("Content-Type", "application/json");
  res.send({ image: imageReceiptId, metadata: metadataReceipt.id });
};

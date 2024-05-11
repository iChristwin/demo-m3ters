import Irys from "@irys/sdk";
import Arweave from "arweave";

export default async (req, res) => {
  const arweave = Arweave.init({
    host: "arweave.net",
    protocol: "https",
    port: 443,
  });

  const irys = new Irys({
    key: await arweave.wallets.generate(),
    url: "https://node2.irys.xyz",
    token: "arweave",
  });

  const { pngBase64, tokenId, attr } = req.body;
  const imgBuffer = Buffer.from(pngBase64, "base64");
  const imageTags = [
    { name: "application-id", value: "M3ter-Head" },
    { name: "Content-Type", value: "image/png" },
  ];

  const metadataTags = [
    { name: "application-id", value: "M3ter-Head" },
    { name: "Content-Type", value: "application/json" },
  ];

  console.log("image size:", imgBuffer.byteLength);
  const imageReceipt = await irys.upload(imgBuffer, { tags: imageTags });
  const imageReceiptId = imageReceipt.id;

  const nftMetadata = {
    name: attr["name"],
    description: `This token integrates with a smart meter, enabling you to sell electricity directly to others, like a mini power plant`,
    attributes: [
      {
        trait_type: "eyes",
        value: attr["eyes"],
      },
      {
        trait_type: "mouth",
        value: attr["mouth"],
      },
      {
        trait_type: "texture",
        value: attr["texture"],
      },
      {
        trait_type: "color",
        value: attr["color"],
      },
      {
        trait_type: "seed",
        value: attr["seed"],
      },
      {
        trait_type: "tokenId",
        value: Number(tokenId),
      },
      {
        trait_type: "src",
        value: "m3ters@1.0.6",
      },
    ],
    image: `https://ar-io.net/${imageReceiptId}`,
  };

  const metadata = JSON.stringify(nftMetadata);
  console.log("data size:", Buffer.byteLength(metadata, "utf8"));
  const receipt = await irys.upload(metadata, { tags: metadataTags });
  const data = { metadata: receipt.id, image: imageReceiptId };
  res.setHeader("Content-Type", "application/json");
  res.send(data);
  console.log(data);
};

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

  const { image, tokenId, attr } = req.body;
  const tags = [
    { name: "application-id", value: "m3ter-head" },
    { name: "Content-Type", value: "application/json" },
  ];

  const nftMetadata = {
    name: attr["name"],
    description: `M3ter-Head #${tokenId} has escaped the code; algorithmically spawned from the seed: ${attr["seed"]}`,
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
        value: tokenId,
      },
      {
        trait_type: "src",
        value: "m3ters@1.0.4",
      },
    ],
    image,
  };

  const metadata = JSON.stringify(nftMetadata);
  console.log("data size:", Buffer.byteLength(metadata, "utf8"));
  const receipt = await irys.upload(metadata, { tags });
  const data = { metadata: receipt.id };
  res.setHeader("Content-Type", "application/json");
  res.send(data);
  console.log(data);
};

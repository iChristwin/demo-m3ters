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

  const { name, image, seed, tokenId, attr } = req.body;

  const tags = [
    { name: "application-id", value: "m3ter-head" },
    { name: "Content-Type", value: "application/json" },
  ];

  const nftMetadata = {
    name,
    description: `M3ter-Head #${tokenId} has escaped the code; algorithmically spawned from the seed: ${seed}`,
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
    image,
  };

  const receipt = await irys.upload(JSON.stringify(nftMetadata), { tags });
  const data = { metadata: receipt.id };
  res.setHeader("Content-Type", "application/json");
  res.send(data);
  console.log(data);
};

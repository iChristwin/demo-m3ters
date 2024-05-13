import React from "react";
import sharp from "sharp";
import { M3terHead } from "m3ters";
import { renderToStaticMarkup } from "react-dom/server";


export default (req, res) => {
  const { seed } = req.query;
  const svgContent = renderToStaticMarkup(<M3terHead seed={seed} />);
  try {
    const pngData = sharp(Buffer.from(svgContent)).png()
    res.setHeader("Content-Type", "image/png");
    res.send(pngData);
  } catch (err) {
    console.error("Error converting SVG:", err);
  }
};

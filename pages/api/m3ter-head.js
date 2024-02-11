import React from 'react';
import { M3terHead } from "m3ters";
import { renderToStaticMarkup } from "react-dom/server";

export default (req, res) => {
  const { seed } = req.query;
  const svgContent = renderToStaticMarkup(<M3terHead seed={seed} />);
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svgContent);
};

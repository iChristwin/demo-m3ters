import React from 'react';
import ReactDOMServer from "react-dom/server";

import { M3terHead } from "m3ters";

export default (req, res) => {
  const { seed } = req.query;
  const svgContent = ReactDOMServer.renderToString(<M3terHead seed={seed} />);
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svgContent);
};

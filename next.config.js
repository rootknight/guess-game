/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export"
  output: "standalone",
};

module.exports = nextConfig;

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);

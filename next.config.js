require("dotenv").config();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = {
  env: {
    API_URL: process.env.API_URL,
    API_MEDIA_URL: process.env.API_MEDIA_URL,
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
  },
  images: {
    domains: [process.env.API_MEDIA_URL],
  },
  withBundleAnalyzer: (function () {
    withBundleAnalyzer({});
  })(),
};

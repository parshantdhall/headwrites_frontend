import Head from "next/head";
import { useState, useEffect, memo } from "react";

const Seo = ({
  title,
  description,
  doFollowLink,
  featuredImage,
  featuredUrl,
  author,
  keywords,
}) => {
  const defaultSiteTitle = "Headwrites - Writings that matters";
  const defaultSiteDescription = "";
  const [defaultUrl, setDefaultUrl] = useState("/"); //NOTE: instead of empty string add the path to index page
  const defaultSiteLogo = "/logo.svg"; //Path to logo
  const defaultKeywords = "";

  // Setting default url
  useEffect(() => {
    if (typeof window !== undefined) {
      setDefaultUrl(window.location.href);
    }
  }, []);
  return (
    <Head>
      {/* All the meta stuff will go here */}

      {/* <!-- Primary Meta Tags --> */}
      <title>{title ? `${title} - Headwrites` : defaultSiteTitle}</title>
      <meta
        name="title"
        content={title ? `${title} - Headwrites` : defaultSiteTitle}
      />
      <meta
        name="description"
        content={description || defaultSiteDescription}
      />
      <meta name="image" content={featuredImage || defaultSiteLogo} />
      <meta
        name="robots"
        content={`index, ${doFollowLink ? "follow" : "nofollow"}`}
      />
      <meta name="author" content={author ? author : "Parshant Dhall"} />

      <meta
        name="keywords"
        content={
          keywords && keywords.length > 0 ? [...keywords] : defaultKeywords
        }
      />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={featuredUrl || defaultUrl} />
      <meta
        property="og:title"
        content={title ? `${title} - Headwrites` : defaultSiteTitle}
      />
      <meta
        property="og:description"
        content={description || defaultSiteDescription}
      />
      <meta property="og:image" content={featuredImage || defaultSiteLogo} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={featuredUrl || defaultUrl} />
      <meta
        property="twitter:title"
        content={title ? `${title} - Headwrites` : defaultSiteTitle}
      />
      <meta
        property="twitter:description"
        content={description || defaultSiteDescription}
      />
      <meta
        property="twitter:image"
        content={featuredImage || defaultSiteLogo}
      ></meta>
    </Head>
  );
};

export default memo(Seo);

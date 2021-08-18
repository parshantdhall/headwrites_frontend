import fs from "fs";
import gFetch from "../lib/gFetch";
const sitemap = () => {};

export default sitemap;

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://headwrites.com",
  }[process.env.NODE_ENV];

  //   fetching dynamic data links
  //   ------------Fetching article slugs---------
  const articleQuery = `
     {
      posts {
         slug
      }
    }
   `;
  const { data: articleData } = await gFetch(articleQuery);

  const allArticleSlugs = articleData?.posts || [];
  //   ------------Fetching Category slugs---------

  const categoryQuery = `
     {
      categories {
         slug
      }
    }
   `;
  const { data: categoryData } = await gFetch(categoryQuery);

  const allCategorySlugs = categoryData?.categories || [];

  //   ------------Fetching Tag slugs---------

  const tagQuery = `{
         tags {
            tagSlug
            }
         }`;
  const { data: tagData } = await gFetch(tagQuery);

  const allTagSlugs = tagData?.tags || [];

  //   ------------Fetching Another Pages slugs---------

  const anotherPageQuery = `{
         pages {
            slug
            }
         }`;
  const { data: anotherPageData } = await gFetch(anotherPageQuery);

  const allAnotherPageSlugs = anotherPageData?.pages || [];
  //   -------Fetching ends here----------------

  const staticPages = fs
    .readdirSync(
      {
        development: "pages",
        production: "./",
      }[process.env.NODE_ENV]
    )
    .filter((staticPage) => {
      //  all excluded files
      return ![
        "_app.js",
        "_document.js",
        "_error.js",
        "sitemap.xml.js",
        "api",
        "[postSlug].js",
        "tag",
        "category",
        "story",
        "page",
        "___next_launcher.js",
        "___vc_bridge.js",
        "node_modules",
        "package.json",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      if (staticPagePath.split(".")[0] === "index") {
        return `${baseUrl}/`;
      }
      return `${baseUrl}/${staticPagePath.split(".")[0]}`;
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}


        ${allArticleSlugs
          .map((dataItem) => {
            return `
            <url>
              <loc>${baseUrl}/${dataItem.slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
          })
          .join("")}


        ${allCategorySlugs
          .map((dataItem) => {
            return `
            <url>
              <loc>${baseUrl}/category/${dataItem.slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
          })
          .join("")}

          ${allTagSlugs
            .map((dataItem) => {
              return `
            <url>
              <loc>${baseUrl}/tag/${dataItem.tagSlug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
            })
            .join("")}

            ${allAnotherPageSlugs
              .map((dataItem) => {
                return `
            <url>
              <loc>${baseUrl}/page/${dataItem.slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
              })
              .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

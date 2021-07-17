import { memo } from "react";
import Image from "next/image";
import { Box, Flex, Spacer, useMediaQuery } from "@chakra-ui/react";

import PageHeader from "../../components/Layout components/PageHeader";

import SideNav from "../../components/Layout components/SideNav";
import ColorModeSwitch from "../../components/Layout components/ColorModeSwitch";
import Seo from "../../components/Seo";
import Footer from "../../components/Footer";
import gFetch from "../../lib/gFetch";
import { shimmer, toBase64 } from "../../lib/imageLoading";

const AllOtherPages = ({ data }) => {
  const { page } = data;
  const { pages } = data;
  // Using media queries
  const [isGreaterThan900] = useMediaQuery("(min-width: 850px)");

  return (
    <>
      <Seo />
      {isGreaterThan900 ? <SideNav links={pages} /> : ""}

      <Box
        role="page container"
        width={isGreaterThan900 ? "80%" : "100%"}
        sx={{
          /* These media queries are for the server side rendering
            becoz u cant use the usemediaquery hook at initial load
            */
          "@media screen and (min-width: 900px)": {
            width: "80%",
          },
        }}
        ml="auto"
        mr="0"
      >
        <Box position="relative" minH="100vh">
          {isGreaterThan900 ? "" : <PageHeader />}
          <Box px={5} mt={5} maxW="100%" minW="100%">
            {/* -----Hero Section----- */}
            <Flex
              pt={isGreaterThan900 ? 3 : ""}
              pos="relative"
              minW="100%"
              minH="md"
              maxH="lg"
            >
              {/* --------Featured Image----- */}
              <Image
                src={page?.featuredImage?.url}
                alt={page.featuredImage?.altText}
                layout="fill"
                objectFit="cover"
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />

              {isGreaterThan900 ? (
                <Flex w="100%" justifyContent="space-between">
                  <Spacer />
                  <Box mx={3}>
                    <ColorModeSwitch />
                  </Box>
                </Flex>
              ) : (
                ""
              )}
            </Flex>
          </Box>
          <Box as="main">{/* Main Stuff goes here! */}</Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default memo(AllOtherPages);

export async function getStaticPaths() {
  const slugQuery = `{pages {
      slug
    }}`;
  const { data } = await gFetch(slugQuery);
  const slugs =
    data && data.pages
      ? data["pages"].map((page) => ({
          params: { pageSlug: page.slug },
        }))
      : "";
  return {
    paths: slugs,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const getSpecificArticleQuery = `
  {
    page(where: {slug: "${context.params.pageSlug}"}) {
       id
      title
      content{
        raw
      }
      slug
      featuredImage{
        url
      }
      seo{
        title
        description
        image{
          url
        }
        keywords
        isFollowLinks
      }
    }
    pages{
      slug
    }
  }
  
  `;
  const { data } = await gFetch(getSpecificArticleQuery);
  return {
    props: { data },
  };
}

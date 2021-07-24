import { memo } from "react";
import Image from "next/image";
import {
  Box,
  Flex,
  Spacer,
  Heading,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";

import PageHeader from "../../components/Layout components/PageHeader";

import SideNav from "../../components/Layout components/SideNav";
import ColorModeSwitch from "../../components/Layout components/ColorModeSwitch";
import Seo from "../../components/Seo";
import Footer from "../../components/Footer";
import gFetch from "../../lib/gFetch";
import { shimmer, toBase64 } from "../../lib/imageLoading";
import ConvertPostBody from "../../lib/ConvertPostBody";
import { grayscale } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const AllOtherPages = ({ data }) => {
  const { page } = data;

  // Using media queries
  const [isGreaterThan900] = useMediaQuery("(min-width: 850px)");

  return (
    <>
      <Seo
        title={page?.seo?.title}
        description={page?.seo?.description}
        keywords={page?.seo?.keywords}
        doFollowLink={page?.seo?.isFollowLinks}
        featuredImage={page?.seo?.image?.url}
        author="Parshant Dhall"
      />
      {isGreaterThan900 ? <SideNav /> : ""}

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
              bgColor={!page.featuredImage ? "gray.300" : ""}
            >
              {/* ----First check if there is featured image */}
              {/* --------Featured Image----- */}
              {page && page.featuredImage ? (
                <Image
                  src={page?.featuredImage?.url}
                  alt={page?.featuredImage?.altText}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                />
              ) : (
                ""
              )}
              {/* --------Title------ */}
              <Box
                alignSelf="flex-end"
                zIndex="1"
                m={3}
                pb={6}
                color="white"
                fontFamily="Montserrat"
                fontSize={isGreaterThan900 ? "xl" : "lg"}
                w="full"
              >
                <Heading as="h1" fontSize={isGreaterThan900 ? "5xl" : "4xl"}>
                  {page?.title}
                </Heading>
                <Text mt={1}>
                  {<ConvertPostBody postcontent={page?.subHeading?.raw} />}
                </Text>
              </Box>
              {/* ----Big screen stuff--- */}
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
            <Box as="main" my={3}>
              <Text as="p" fontSize="lg" fontFamily="Montserrat">
                {<ConvertPostBody postcontent={page?.content?.raw} />}
              </Text>
            </Box>
          </Box>
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
      subHeading{
        raw
      }
      content{
        raw
      }
      slug
      featuredImage{
        url
        altText
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
  }
  
  `;
  const { data } = await gFetch(getSpecificArticleQuery);
  return {
    props: { data },
  };
}

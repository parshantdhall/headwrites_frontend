import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image as ChakraImg,
  Text,
  useColorModeValue,
  useMediaQuery,
  VStack,
  Avatar,
  Divider,
  Heading,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import ColorModeSwitch from "../components/Layout components/ColorModeSwitch";
import gFetch from "../lib/gFetch";
import parseDate from "../lib/parseDate";
import Seo from "../components/Seo";
import parseHtml from "../lib/parseHtml";
import FloatingFooter from "../components/blog section componenets/FloatingFooter";
import FootSlider from "../components/FootSlider";
import Footer from "../components/Footer";
// import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SocialShareBlock from "../components/blog section componenets/SocialShareBlock";

const SinglePostPage = ({ data }) => {
  const article = data ? data.articles[0] : "";
  const seoStuff = article.SEO_Component;
  const router = useRouter();
  const canGoBack =
    router && router.components ? ["/"] in router.components : "";
  const [isSmallerThanIp6] = useMediaQuery("(max-width: 350px)");
  const [isGreaterThan900] = useMediaQuery("(min-width: 850px)");

  // ---------getting related articles data-------
  const [relatedArticles, setRelatedArticles] = useState([]);

  // -----React intersection observer-------
  const { ref, inView: articleInView } = useInView();
  const { ref: tagRef, inView: tagsInview } = useInView();

  // ----------UseEffect-----------------
  useEffect(() => {
    (async () => {
      try {
        const getRelatedArticlesQuery = `{
          articles(sort: "published_at:desc", where: {category: {
            category_name_containss: "${article.category.category_name}"
          },Title_ne: "${article.Title}" },){
            id
            Title
            Slug,
            Featured_image{
              formats
              alternativeText
            }
          }
        }`;

        const { data } = await gFetch(getRelatedArticlesQuery);
        setRelatedArticles(data.articles);
      } catch (err) {
        console.dir(err);
      }
      // setRelatedArticles(data.articles ? data.articles : []);
    })();
  }, [article]);

  // -----go Back btn-------
  const goBack = () => {
    /** it will check if it can go back then it will
     * go back otherwise it will go to main page.
     *
     */
    if (canGoBack) {
      router.back();
    } else {
      router.push("/");
    }
  };
  // console.dir(article);

  return (
    <>
      <Seo
        title={seoStuff && seoStuff.Page_Title ? seoStuff.Page_Title : ""}
        description={
          seoStuff && seoStuff.Page_Description ? seoStuff.Page_Description : ""
        }
        doFollowLink={
          seoStuff &&
          (seoStuff.Is_Follow_links !== undefined ||
            seoStuff.Is_Follow_links !== null)
            ? seoStuff.Is_Follow_links
            : ""
        }
        featuredImage={`${process.env.API_URL}${article?.Featured_image?.formats?.medium?.url}`}
        author={article.author ? article.author.author_name : ""}
        keywords={seoStuff && seoStuff.keywords}
      />
      <Box as="section" p={isGreaterThan900 ? 4 : ""}>
        {/* header */}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          as="header"
          aria-label="article head"
          p={3}
          mb={3}
        >
          <Box>
            {canGoBack ? (
              <IconButton
                aria-label="back button"
                onClick={() => {
                  goBack();
                }}
                _focus={{
                  outline: "none",
                }}
                icon={<FaChevronLeft />}
              ></IconButton>
            ) : (
              <Button
                aria-label="back button"
                onClick={goBack}
                _focus={{
                  outline: "none",
                }}
              >
                All Posts
              </Button>
            )}
          </Box>
          <Box maxW={isGreaterThan900 ? "200px" : "150px"} cursor="pointer">
            <Link href="/">
              <a title="go to home">
                <ChakraImg
                  src={useColorModeValue("/logo.svg", "/logodark.svg")}
                  alt="headwrites logo"
                  minW="100%"
                  minH="100%"
                  w="100%"
                />
              </a>
            </Link>
          </Box>
          <ColorModeSwitch />
        </Flex>
        {/* ---------------Body--------------- */}
        <Box
          as="section"
          aria-label="Article content section"
          width="100%"
          id="article"
        >
          {/* ------Featured Image------- */}
          <Box
            width="100%"
            minH="65vh"
            position="relative"
            borderRadius="2rem"
            overflow="hidden"
            zIndex="-1"
          >
            <Image
              src={
                process.env.API_URL +
                article?.Featured_image?.formats?.large?.url
              }
              alt={article.Featured_image.alternativeText}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </Box>
          {/* ---------Article Content--------- */}
          <Box
            as="main"
            bg={useColorModeValue("white", "rgb(26, 32, 44)")}
            p={6}
            mt="-4rem"
            mb={2}
            borderRadius="2rem"
            boxShadow="md"
            zIndex="1"
            display="flex"
            flexDir="column"
            alignItems="center"
            mx={isGreaterThan900 ? 20 : ""}
          >
            <Box maxW="900px">
              {/* -------Category-------- */}
              <Link
                href={`/category/${
                  article.category ? article.category.Slug : ""
                }`}
              >
                <a
                  title={`Go to ${
                    article.category
                      ? article.category.category_name
                      : "uncategorized"
                  } related blogs page`}
                >
                  <Box
                    as="h2"
                    fontSize={isSmallerThanIp6 ? "xs" : "sm"}
                    bg="_blue"
                    p={2}
                    borderRadius="lg"
                    width="fit-content"
                    my={3}
                    color="white"
                    cursor="pointer"
                  >
                    {article.category
                      ? article.category.category_name
                      : "uncategorized"}
                  </Box>
                </a>
              </Link>
              {/* -----------Title------------ */}
              <Heading
                aria-label="Article title"
                fontWeight="bold"
                fontFamily="Merriweather"
                letterSpacing="xs"
                lineHeight="shorter"
                as="h1"
                color={useColorModeValue("_black", "white")}
                fontSize={isSmallerThanIp6 ? "3xl" : "4xl"}
              >
                {article.Title}
              </Heading>

              {/* Article Body */}
              <Box
                as="article"
                my={3}
                aria-label="article body"
                fontSize={isGreaterThan900 ? "18px" : "md"}
                color={useColorModeValue("gray.700", "gray.200")}
                fontFamily="Montserrat"
                lineHeight="tall"
                ref={ref}
              >
                {parseHtml(article.Body)}
              </Box>
              {/* -------Tags-------- */}
              <HStack spacing={2} my={2} ref={tagRef}>
                {article.article_tags.length > 0
                  ? article.article_tags.map((tag) => (
                      <Link key={tag.id} href={`/tag/${tag.tag_name}`}>
                        <a title={`go to ${tag.tag_name} tag page`}>
                          <Tag size="md" colorScheme="cyan" cursor="pointer">
                            <TagLabel>#{tag.tag_name}</TagLabel>
                          </Tag>
                        </a>
                      </Link>
                    ))
                  : ""}
              </HStack>
              {/* --------Social Share----------- */}
              <Box
                p={3}
                my={4}
                borderRadius="lg"
                bgColor={useColorModeValue("#f8f8ff", "_black")}
                boxShadow="md"
                maxW="lg"
                minW="200px"
              >
                <SocialShareBlock
                  title={article.Title}
                  url={router.asPath}
                  featuredImage={article?.Featured_image?.formats?.medium?.url}
                />
              </Box>
              <Divider />
              <HStack spacing={3} my={3} alignItems="center">
                <Avatar
                  size={isSmallerThanIp6 ? "sm" : "md"}
                  name={article.author ? article.author.author_name : ""}
                  src={
                    article.author
                      ? `${process.env.API_URL}${article?.author?.author_avatar?.url}`
                      : ""
                  }
                />
                <VStack spacing={1} alignItems="flex-start" p={2}>
                  <Text
                    as="p"
                    fontSize={isSmallerThanIp6 ? "sm" : "md"}
                    color={useColorModeValue("_black", "white")}
                  >
                    {article.author ? article.author.author_name : "Anon"}
                  </Text>
                  <Text
                    as="p"
                    fontSize={isSmallerThanIp6 ? "xs" : "sm"}
                    color={useColorModeValue("_blue", "_green")}
                  >
                    {parseDate(article.published_at)}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* ----------Related article slider----------- */}

      <FootSlider artData={relatedArticles} />

      {/* --------Social Media Floating footer---------- */}
      {!isGreaterThan900 ? (
        <FloatingFooter
          title={article.Title}
          url={router.asPath}
          articleInView={articleInView}
          tagsInView={tagsInview}
          featuredImage={article?.Featured_image?.formats?.medium?.url}
        />
      ) : (
        ""
      )}

      {/* -----------Site Footer--------- */}
      <Footer />
    </>
  );
};

// Other fetching stuff--------
export default memo(SinglePostPage);

export async function getStaticPaths() {
  const slugQuery = `{articles {
    Slug
  }}`;
  const { data } = await gFetch(slugQuery);
  const slugs =
    data && data.articles
      ? data["articles"].map((article) => ({
          params: { postSlug: article.Slug },
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
  articles(where: {Slug_containss: "${context.params.postSlug}"}) {
    id
    Title
    Body
    Slug,
    Featured_image{
      formats
      alternativeText
      caption
    }
    category{
      category_name
      Slug
    }
    author {
      author_name
      author_avatar {
        url
      }
    }
    Is_guest_post
    published_at
    SEO_Component {
      Page_Title
      Page_Description
      Is_Follow_links
      keywords
  }
  article_tags {
    id
    tag_name
  }
}
}
`;
  const { data } = await gFetch(getSpecificArticleQuery);

  return {
    props: { data }, // will be passed to the page component as props
  };
}

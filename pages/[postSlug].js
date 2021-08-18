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
import FloatingFooter from "../components/blog section componenets/FloatingFooter";
import FootSlider from "../components/FootSlider";
import Footer from "../components/Footer";
import { useInView } from "react-intersection-observer";
import SocialShareBlock from "../components/blog section componenets/SocialShareBlock";
import { shimmer, toBase64 } from "../lib/imageLoading";
import ConvertPostBody from "../lib/ConvertPostBody";
import calculateReadTime from "../lib/calculateReadTime";
import ScrollToTop from "../components/Layout components/ScrollToTop";

const SinglePostPage = ({ data, relatedArticlesData }) => {
  const article = data ? data.post : {};
  const seoStuff = article.seo;
  const router = useRouter();
  const canGoBack =
    router && router.components ? ["/"] in router.components : "";
  const [isSmallerThanIp6] = useMediaQuery("(max-width: 350px)");
  const [isGreaterThan900] = useMediaQuery("(min-width: 850px)");

  // ---------getting related articles data-------
  const { posts: relatedArticlesArray } =
    relatedArticlesData !== undefined && typeof relatedArticlesData === "object"
      ? relatedArticlesData
      : [];
  // -----React intersection observer-------
  const { ref, inView: articleInView } = useInView();
  const { ref: tagRef, inView: tagsInview } = useInView();

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

  // ----------Cal reading time---------
  const ert = calculateReadTime(article?.content?.text);

  return (
    <>
      <Seo
        title={seoStuff && seoStuff.title ? seoStuff.title : ""}
        description={
          seoStuff && seoStuff.description ? seoStuff.description : ""
        }
        doFollowLink={
          seoStuff &&
          (seoStuff.isFollowLinks !== undefined ||
            seoStuff.isFollowLinks !== null)
            ? seoStuff.isFollowLinks
            : ""
        }
        featuredImage={seoStuff && seoStuff.image ? seoStuff.image?.url : ""}
        author={article.author ? article.author.name : ""}
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
        <Box as="main" role="Article content section" width="100%" id="article">
          {/* ------Featured Image------- */}
          <Box
            width="100%"
            minH="65vh"
            position="relative"
            borderRadius="2rem"
            overflow="hidden"
            zIndex="-1"
          >
            {/* check if there is featured image */}
            {article && article.featuredImage ? (
              <Image
                src={article?.featuredImage?.url}
                alt={article.featuredImage?.altText}
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
          </Box>
          {/* -------------------------------Article Content-------------------------- */}
          <Box
            as="article"
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
            itemScope
            itemType="http://schema.org/Article"
          >
            {/* -------Schema.org for SEO Stuff -------------*/}

            <meta itemProp="datePublished" content={article?.date} />
            <meta itemProp="dateModified" content={article?.updatedAt} />
            <meta
              itemProp="image"
              content={
                article.featuredImage
                  ? article?.featuredImage?.url
                  : "/logo.svg"
              }
            />
            <meta itemProp="publisher" content="headwrites.com" />
            {/* ---------------------------------------------------- */}
            <Box maxW="900px">
              {/* -------Category-------- */}
              <HStack justifyContent="space-between" alignItems="center">
                {article.category && article.category !== null ? (
                  <Link href={`/category/${article.category?.slug}`}>
                    <a
                      title={`Go to ${
                        article.category.categoryName
                          ? article.category.categoryName
                          : "uncategorized"
                      } related blogs page`}
                    >
                      <Box
                        role="article's category"
                        fontSize={isSmallerThanIp6 ? "xs" : "sm"}
                        bg="_blue"
                        p={2}
                        borderRadius="lg"
                        width="fit-content"
                        my={3}
                        color="white"
                        cursor="pointer"
                      >
                        {article.category.categoryName
                          ? article.category.categoryName
                          : "uncategorized"}
                      </Box>
                    </a>
                  </Link>
                ) : (
                  <Link href={`/`}>
                    <a title={`Go to ${"uncategorized"} related blogs page`}>
                      <Box
                        fontSize={isSmallerThanIp6 ? "xs" : "sm"}
                        bg="_blue"
                        p={2}
                        borderRadius="lg"
                        width="fit-content"
                        my={3}
                        color="white"
                        cursor="pointer"
                      >
                        {"Uncategorized"}
                      </Box>
                    </a>
                  </Link>
                )}
                <Box>
                  <Text
                    color={useColorModeValue("_blue", "_green")}
                  >{`${ert.min} min ${ert.sec} secs`}</Text>
                </Box>
              </HStack>
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
                itemProp="name headline"
              >
                {article.title}
              </Heading>

              {/* ---------Article Body---------- */}
              <Box
                role="article body"
                my={3}
                aria-label="article body"
                fontSize={isGreaterThan900 ? "18px" : "md"}
                color={useColorModeValue("gray.700", "gray.200")}
                fontFamily="Montserrat"
                lineHeight="tall"
                ref={ref}
                position="relative"
                itemProp="articleBody"
              >
                {<ConvertPostBody postcontent={article.content.raw} />}
              </Box>
              {/* -------Tags-------- */}
              <HStack spacing={2} my={2} ref={tagRef}>
                {article.postTags.length > 0
                  ? article.postTags.map((tag) => (
                      <Link key={tag.id} href={`/tag/${tag.tagSlug}`}>
                        <a title={`go to ${tag.tagName} tag page`}>
                          <Tag size="md" colorScheme="cyan" cursor="pointer">
                            <TagLabel>#{tag.tagName}</TagLabel>
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
                  title={article.title}
                  url={router.asPath}
                  featuredImage={article?.FeaturedImage?.url}
                />
              </Box>
              <Divider />
              {/* -----------Author details---------- */}
              <HStack spacing={3} my={3} alignItems="center">
                <Avatar
                  size={isSmallerThanIp6 ? "sm" : "md"}
                  name={article.author ? article.author.name : "Anon"}
                  src={article.author ? article?.author?.picture?.url : ""}
                />
                <VStack spacing={1} alignItems="flex-start" p={2}>
                  <Text
                    itemProp="author"
                    name={article.author ? article.author.name : "Anon"}
                    as="p"
                    fontSize={isSmallerThanIp6 ? "sm" : "md"}
                    color={useColorModeValue("_black", "white")}
                  >
                    {article.author ? article.author.name : "Anon"}
                  </Text>
                  {/* -------Date Published------- */}
                  <Text
                    as="time"
                    fontSize={isSmallerThanIp6 ? "xs" : "sm"}
                    color={useColorModeValue("_blue", "_green")}
                  >
                    {parseDate(article?.date)}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* ----------Related article slider----------- */}

      <FootSlider artData={relatedArticlesArray} />

      {/* --------Social Media Floating footer---------- */}
      {!isGreaterThan900 ? (
        <FloatingFooter
          title={article.title}
          url={router.asPath}
          articleInView={articleInView}
          tagsInView={tagsInview}
          featuredImage={article?.FeaturedImage?.url}
        />
      ) : (
        ""
      )}

      {/* -----------Site Footer--------- */}
      <Footer />
      {/* --------Scroll To Top Btn------ */}
      <ScrollToTop />
    </>
  );
};

// Other fetching stuff--------
export default SinglePostPage;

export async function getStaticPaths() {
  const slugQuery = `{posts {
    slug
  }}`;
  const { data } = await gFetch(slugQuery);
  const slugs =
    data && data.posts
      ? data["posts"].map((post) => ({
          params: { postSlug: post.slug },
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
  post(where: {slug: "${context.params.postSlug}"}) {
     id
    title
    content{
      raw
      text
    }
    slug
    date
    updatedAt
    category{
      id
      slug
      categoryName
    }
    featuredImage{
      url
      altText
    }
    featuredPost
    author{
      name
      picture{
        url
      }
    }
    postTags{
      id
      tagName
      tagSlug
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
  // Getting related articles
  if (data.post && data.post.category && data.post.category !== null) {
    try {
      const getRelatedArticlesQuery = `{
        posts(orderBy: date_DESC, where: {category: {categoryName_contains: "${data.post.category.categoryName}"},
        title_not_contains: "${data.post.title}"}){
          id
          title
          slug,
          featuredImage {
            url
                altText
              }
            }
          }`;
      const { data: relatedArticlesData } = await gFetch(
        getRelatedArticlesQuery
      );
      // console.log(relatedArticlesData);
      return {
        props: { data, relatedArticlesData }, // will be passed to the page component as props
      };
    } catch (e) {
      console.log(e);
    }
  }
  return {
    props: { data },
  };
}

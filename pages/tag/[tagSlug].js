import { useState, useEffect } from "react";
import gFetch from "../../lib/gFetch";
import FuzzySearch from "fuzzy-search";
import Layout from "../../components/Layout";
import {
  Box,
  SimpleGrid,
  Center,
  Button,
  useMediaQuery,
  Heading,
} from "@chakra-ui/react";
import { RiArrowDownLine } from "react-icons/ri";
import SquareBlogCard from "../../components/blog section componenets/SquareBlogCard";
import { useRouter } from "next/router";

const TagSpecificPage = ({ artData }) => {
  // Media query for screen smaller than iphone 6
  const [isSmallerThanIp6] = useMediaQuery("(max-width: 350px)");
  const router = useRouter();
  // --------------COnfiguring Loadmore-------
  const allowedNumOfArticles = artData.length > 9 ? 9 : artData.length;
  const [numOfArticles, setNumOfArticles] = useState(allowedNumOfArticles);
  // These are the num og articles left to render
  const [numOfArticlesLeft, setNumOfArticlesLeft] = useState();
  // initializing the number of artilces to show or left
  useEffect(() => {
    updateNumOfArticlesLeft(allowedNumOfArticles);
    setNumOfArticles(allowedNumOfArticles);
  }, [artData]);
  // Slicing the number of articles to show
  const slicedArticlesData = artData.slice(0, numOfArticles);
  // -------------search query---------
  const [searchKeyword, setSearchKeyword] = useState("");
  const searcher = new FuzzySearch(slicedArticlesData, [
    "Title",
    "author.author_name",
    "article_tags.tag_name",
  ]);
  const searchResult = searcher.search(searchKeyword);

  // udpate the search keyword according to the inpu on search field
  const updateSearchKeyword = (input) => {
    setSearchKeyword(input);
  };

  // updateing number of aticles left
  const updateNumOfArticlesLeft = (num) => {
    setNumOfArticlesLeft(Number(artData.length - +num));
  };

  // Updating the end index of article data
  const updateNumOfArticles = () => {
    /**
     * Here it will check if the number of artiles that are left are more than the
     * allowed num of articles and if yes then it will add allowed num to the
     * prev num of articles shown otherwise it will add the num of articles that
     * are lft from the whole data
     */
    setNumOfArticles((prevState) => {
      let newNumOfArticlesLeft = Number(artData.length - Number(prevState));
      if (newNumOfArticlesLeft > allowedNumOfArticles) {
        updateNumOfArticlesLeft(prevState + allowedNumOfArticles);
        return +prevState + allowedNumOfArticles;
      }
      updateNumOfArticlesLeft(prevState + newNumOfArticlesLeft);
      return +prevState + newNumOfArticlesLeft;
    });
  };
  return (
    <Layout
      searchKeyword={searchKeyword}
      setSearchKeyword={updateSearchKeyword}
    >
      <Box px={6} mt={5}>
        {/* Section Heading */}
        <Box mb={3}>
          <Heading as="h1">{`#${router.query.tagSlug}`}</Heading>
        </Box>
        {/* Blog card */}
        {searchResult && searchResult.length > 0 ? (
          <Box as="section" width="100%" overflow="hidden">
            <SimpleGrid
              minChildWidth={isSmallerThanIp6 ? "220px" : "280px"}
              spacing="15px"
              py={2}
            >
              {searchResult.map((article, i) => (
                <SquareBlogCard
                  article={article}
                  key={article.id}
                  indexNum={i}
                />
              ))}
            </SimpleGrid>
            <Center>
              {numOfArticlesLeft > 0 ? (
                <Button
                  color="white"
                  bgColor="_blue"
                  my={2}
                  size="md"
                  rightIcon={<RiArrowDownLine />}
                  onClick={updateNumOfArticles}
                  _hover={{
                    bgColor: "nono",
                  }}
                >
                  Load More
                </Button>
              ) : (
                ""
              )}
            </Center>
          </Box>
        ) : (
          <Center>
            <Box as="h2">No Data found</Box>
          </Center>
        )}
      </Box>
    </Layout>
  );
};
// };

export async function getStaticPaths() {
  const slugQuery = `{
         articleTags {
            tag_name
            }
         }`;

  const { data } = await gFetch(slugQuery);
  const slugs =
    data && data.articleTags
      ? data.articleTags.map((tag) => ({
          params: { tagSlug: tag.tag_name },
        }))
      : "";

  return {
    paths: slugs,
    fallback: false,
  };
}

// Fetching data
export async function getStaticProps(context) {
  const getSpecificArticleByCatQuery = `
{
  articles(sort: "published_at:desc",where: {article_tags: {
    tag_name_containss: "${context.params.tagSlug}"
  } }) {
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
    }
    author {
      author_name
      author_avatar {
        url
      }
    }
    Is_guest_post
    published_at
    article_tags {
    id
    tag_name
  }
}

}
  `;
  const data = await gFetch(getSpecificArticleByCatQuery);
  if (!data) {
    return {
      notFound: true,
    };
  }

  const artData = data.data && data.data.articles ? data.data.articles : [];

  return {
    props: {
      artData,
    },
  };
}

export default TagSpecificPage;

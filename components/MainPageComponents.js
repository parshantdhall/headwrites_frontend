import { useState, useEffect } from "react";
import FuzzySearch from "fuzzy-search";
import { Box } from "@chakra-ui/react";
import Layout from "./Layout";
import BlogSection from "./BlogSection";
import Slider from "./Slider";

const MainPageComponents = ({ artData, catData }) => {
  // --------------COnfiguring Loadmore -------
  const allowedNumOfArticles = artData.length > 9 ? 9 : artData.length;
  const [numOfArticles, setNumOfArticles] = useState(allowedNumOfArticles);
  // These are the num og articles left to render
  const [numOfArticlesLeft, setNumOfArticlesLeft] = useState(
    Number(artData.length - allowedNumOfArticles)
  );
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
        {/* <StorySection /> */}
        {/* --------Slider Section---------- */}
        <Box
          as="section"
          aria-label="Featured Blogs Section"
          my={5}
          w="100%"
          display={searchKeyword.length > 0 ? "none" : "block"}
        >
          <Slider />
        </Box>
        {/* -----------Blog Section------- */}
        <BlogSection
          articleData={searchResult}
          categoryData={catData}
          updateNumOfArticles={updateNumOfArticles}
          numOfArticlesLeft={numOfArticlesLeft}
          searchKeyword={searchKeyword}
        />
      </Box>
    </Layout>
  );
};

export default MainPageComponents;

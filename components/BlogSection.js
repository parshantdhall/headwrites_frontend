import {
  Box,
  SimpleGrid,
  Center,
  HStack,
  Icon,
  Stack,
  Spacer,
  useMediaQuery,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiPagesLine, RiArrowDownLine } from "react-icons/ri";
import SquareBlogCard from "./blog section componenets/SquareBlogCard";
import SectionHeading from "./SectionHeading";
import SelectCatNav from "./blog section componenets/SelectCatNav";
// import FilterCat from "./searh and filter/FilterCat";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/components/scrollbar/scrollbar.min.css";
import SwiperCore, { Scrollbar } from "swiper/core";

// install Swiper modules
SwiperCore.use([Scrollbar]);

// ----------Componenet starts from here------------
const BlogSection = ({
  articleData,
  categoryData,
  updateNumOfArticles,
  numOfArticlesLeft,
  searchKeyword,
}) => {
  // Media query for screen smaller than iphone 6
  const [isSmallerThanIp6] = useMediaQuery("(max-width: 350px)");

  // -----returning component---------
  return (
    <Stack as="section" aria-label="Blogs Section" spacing="5px" mt={3}>
      {/* Section Heading */}
      <HStack display={searchKeyword.length > 0 ? "none" : "flex"}>
        <SectionHeading headingText="Blogs" />
        <Icon as={RiPagesLine} color="_green" boxSize="1.3em" />
        <Spacer />
      </HStack>
      {/* Cat Menu */}
      <Box
        width="100%"
        aria-label="select category"
        position="sticky"
        top="0"
        zIndex="sticky"
        backgroundColor={useColorModeValue("white", "#1A202C")}
        display={searchKeyword.length > 0 ? "none" : "block"}
      >
        <Swiper
          spaceBetween={7}
          slidesPerView={"auto"}
          scrollbar={{
            hide: true,
          }}
        >
          <SwiperSlide>
            <SelectCatNav catName="All" />
          </SwiperSlide>
          {categoryData &&
            categoryData.map((cat) => (
              <SwiperSlide key={cat.id}>
                <SelectCatNav catName={cat.categoryName} catSlug={cat.slug} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
      {/* Blog card */}
      {articleData && articleData.length > 0 ? (
        <Box as="section" width="100%" overflow="hidden">
          <SimpleGrid
            minChildWidth={isSmallerThanIp6 ? "220px" : "290px"}
            spacing="15px"
            py={2}
          >
            {articleData.map((article, i) => (
              <SquareBlogCard article={article} key={article.id} indexNum={i} />
            ))}
          </SimpleGrid>
          <Center>
            {numOfArticlesLeft > 0 && searchKeyword.length <= 0 ? (
              <Button
                color="white"
                bgColor="_blue"
                my={2}
                size="md"
                rightIcon={<RiArrowDownLine />}
                onClick={updateNumOfArticles}
                _hover={{
                  bgColor: "none",
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
    </Stack>
  );
};

export default BlogSection;

import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";
import Slide from "./slider components/Slide";

const FeaturedArticleSlider = ({ articleData }) => {
  const [filteredArtData, setFilteredArtData] = useState([]);
  const [isGreaterThan900] = useMediaQuery("(min-width: 850px)");
  SwiperCore.use([Autoplay]);

  useEffect(() => {
    // -----Filtering out featired posts-------
    let filteredPosts;
    articleData.length > 0
      ? (filteredPosts = articleData.filter(
          (article) =>
            article.featuredPost !== undefined && article.featuredPost === true
        ))
      : [];
    setFilteredArtData(filteredPosts);
  }, [articleData]);

  return (
    <Box cursor="grab" width="100%">
      <Swiper
        spaceBetween={isGreaterThan900 ? 90 : 20}
        slidesPerView={"auto"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {filteredArtData && filteredArtData.length > 0
          ? filteredArtData.map((post) => (
              <SwiperSlide key={post.id}>
                <Slide {...post} />
              </SwiperSlide>
            ))
          : ""}
      </Swiper>
    </Box>
  );
};

export default FeaturedArticleSlider;

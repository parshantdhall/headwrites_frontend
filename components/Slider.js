import { useEffect, useState } from "react";
import gFetch from "../lib/gFetch";
import { Box } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";
import Slide from "./slider components/Slide";

const Slider = () => {
  const [artData, setArtData] = useState([]);
  const [isGreaterThan900] = useMediaQuery("(min-width: 850px)");
  SwiperCore.use([Autoplay]);

  useEffect(() => {
    (async () => {
      try {
        const getFeaturedArticlesQuery = `
        {
          articles(sort: "published_at:desc", where: {
            is_featured: true
          }){
            id
            Title
            Slug,
            Featured_image{
              formats
              alternativeText
              caption
            }
            category{
              category_name
            }
          }
        }
        `;

        const { data } = await gFetch(getFeaturedArticlesQuery);
        // console.dir(data);
        setArtData(data.articles ? data.articles : []);
      } catch (err) {
        console.dir(err);
      }
    })();
  }, []);

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
        {artData.length > 0 &&
          artData.map((post) => (
            <SwiperSlide key={post.id}>
              <Slide {...post} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default Slider;

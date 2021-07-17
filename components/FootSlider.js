import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Heading } from "@chakra-ui/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import FootSlide from "./slider components/FootSlide";

const FootSlider = ({ artData }) => {
  const bgCol = useColorModeValue("gray.100", "#0e1111");
  return artData && artData.length > 0 ? (
    <Box as="section" w="100%" my={6} p={4} pb={10} bgColor={bgCol}>
      <Heading as="h2" my={3} fontFamily="Montserrat" textAlign="center">
        {" "}
        Related Posts
      </Heading>
      <Swiper slidesPerView={"auto"} spaceBetween={20}>
        {artData.map((article) => (
          <SwiperSlide key={article.id}>
            <FootSlide {...article} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  ) : (
    ""
  );
};

export default FootSlider;

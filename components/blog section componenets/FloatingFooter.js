import { Box, useColorModeValue } from "@chakra-ui/react";
import SocialShareBlock from "./SocialShareBlock";

const FloatingFooter = ({
  title,
  url,
  featuredImage,
  articleInView,
  tagsInView,
}) => {
  return (
    <Box
      py={4}
      px={2}
      pb={5}
      w="full"
      boxShadow="2xl"
      position="fixed"
      left="50%"
      bottom={articleInView && !tagsInView ? 0 : "-100vh"}
      transition=".6s ease-in-out"
      transform="translateX(-50%)"
      bgColor={useColorModeValue("rgba(255,255,255,.6)", "rgba(0,0,0,.6)")}
      zIndex="sticky"
      className="FloatingFooter"
    >
      <Box w="full">
        <SocialShareBlock
          title={title}
          url={url}
          featuredImage={featuredImage}
        />
      </Box>
    </Box>
  );
};

export default FloatingFooter;

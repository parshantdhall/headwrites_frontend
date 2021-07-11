import Image from "next/image";
import { Box, Text, VStack } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useMediaQuery } from "@chakra-ui/media-query";
import Link from "next/link";

const Slide = ({ featuredImage, title, category, slug }) => {
  // Using media queries
  const [isGreaterThan900] = useMediaQuery("(min-width: 850px)");
  return (
    <Link href={`/${slug}`} passHref>
      <VStack
        alignItems="flex-start"
        spacing={2}
        pos="relative"
        maxW="350px"
        cursor="pointer"
      >
        <Box role="featured post written-content">
          <Text
            fontSize={isGreaterThan900 ? "sm" : "xs"}
            color={useColorModeValue("_blue", "_green")}
            fontFamily="quicksand"
            textTransform="uppercase"
            aria-label="Featured post category."
            sx={{
              /* These media queries are for the server side rendering
          becoz u cant use the usemediaquery hook at initial load
          */
              "@media screen and (min-width: 900px)": {
                fontSize: "14px",
              },
            }}
          >
            {category && category.categoryName
              ? category.categoryName
              : "uncategorized"}
          </Text>
          <Text
            as="h1"
            fontFamily="quicksand"
            color={useColorModeValue("_black", "white")}
            fontSize={isGreaterThan900 ? "md" : "sm"}
            fontWeight="bold"
            maxW={isGreaterThan900 ? "420px" : "300px"}
            isTruncated
            aria-label="Featured post title"
            sx={{
              /* These media queries are for the server side rendering
          becoz u cant use the usemediaquery hook at initial load
          */
              "@media screen and (min-width: 900px)": {
                fontSize: "16px",
              },
            }}
          >
            {title}
          </Text>
        </Box>

        <Box
          role="image container"
          height={isGreaterThan900 ? "300px" : "250px"}
          width={isGreaterThan900 ? "420px" : "300px"}
          pos="relative"
          borderRadius="lg"
          overflow="hidden"
          sx={{
            /* These media queries are for the server side rendering
          becoz u cant use the usemediaquery hook at initial load
          */
            "@media screen and (min-width: 900px)": {
              width: "420px",
              height: "300px",
            },
          }}
        >
          <Image
            src={featuredImage?.url}
            layout="fill"
            objectFit="cover"
            aria-label="Featured post image."
            quality={80}
            alt={
              featuredImage?.altText ? featuredImage?.altText : "Featured image"
            }
          />
        </Box>
      </VStack>
    </Link>
  );
};

export default Slide;

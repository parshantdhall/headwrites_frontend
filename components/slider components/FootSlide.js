import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const FootSlide = ({ featuredImage, title, slug }) => {
  const [isSmallerThanIp6] = useMediaQuery("(max-width: 350px)");

  return (
    <Box w="fit-content">
      <Link href={`/${slug}`} passHref>
        <a>
          <Box
            position="relative"
            overflow="hidden"
            // minH="sm"
            h="250px"
            w="250px"
            cursor="pointer"
            borderRadius="3xl"
          >
            {/* Featured image */}
            <Box
              position="absolute"
              top="0"
              left="0"
              minW="100%"
              minH="100%"
              aria-label="Related article image"
              overflow="hidden"
            >
              <Image
                src={featuredImage?.url}
                alt={featuredImage?.altText}
                layout="fill"
                objectFit="cover"
                quality={80}
              />
            </Box>
            {/* Card Content */}
            <Box
              p={4}
              bg={useColorModeValue("white", "_black")}
              position="absolute"
              left="0"
              bottom="0"
              m={3}
              borderRadius="3xl"
              minW="90%"
            >
              {/* title */}
              <Box
                mt={1}
                aria-label="Article title"
                fontWeight="semibold"
                letterSpacing="xs"
                lineHeight="shorter"
                as="h1"
                fontSize={isSmallerThanIp6 ? "xs" : "sm"}
                color={useColorModeValue("_black", "white")}
                fontFamily="Merriweather"
              >
                {title}
              </Box>
            </Box>
          </Box>
        </a>
      </Link>
    </Box>
  );
};

export default memo(FootSlide);

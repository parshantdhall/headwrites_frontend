import { memo } from "react";
import {
  Box,
  Flex,
  useMediaQuery,
  Avatar,
  Text,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import parseDate from "../../lib/parseDate";
import { motion } from "framer-motion";
import Image from "next/image";

const SquareBlogCard = ({ article, indexNum }) => {
  // Media query for screen smaller than iphone 6
  const [isSmallerThanIp6] = useMediaQuery("(max-width: 350px)");
  const containerVariants = {
    hidden: {
      opacity: 0,
      x: "-100px",
    },
    visible: {
      opacity: 1,
      x: "0",
      scale: 1,
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: "-2px" }}
      whileTap={{ scale: 0.98 }}
      transition={{
        x: { delay: indexNum * 0.1 },
        opacity: { delay: indexNum * 0.1 },
        scale: {
          delay: -6,
          type: "spring",
        },
      }}
      id={`sqCard_${article.id}`}
    >
      <Link href={`/${article.Slug}`}>
        <Box
          position="relative"
          overflow="hidden"
          minH="sm"
          maxW="sm"
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
            aria-label="Article featured image"
            overflow="hidden"
          >
            <Image
              src={
                process.env.API_URL +
                article.Featured_image?.formats?.medium?.url
              }
              alt={article.Featured_image.alternativeText}
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
            minW={isSmallerThanIp6 ? "90" : "93.75%"}
          >
            {/* Category */}
            <Text
              as="h2"
              fontSize={isSmallerThanIp6 ? "xs" : "sm"}
              color={useColorModeValue("_blue", "_green")}
              fontFamily="quicksand"
            >
              {article.category
                ? article.category.category_name
                : "uncategorized"}
            </Text>
            {/* title */}
            <Box
              mt={1}
              aria-label="Article title"
              fontWeight="semibold"
              letterSpacing="xs"
              lineHeight="shorter"
              as="h1"
              fontSize={isSmallerThanIp6 ? "lg" : "xl"}
              color={useColorModeValue("_black", "white")}
              fontFamily="Merriweather"
            >
              {article.Title}
            </Box>
            {/* footer */}
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mt={3}
            >
              <HStack spacing={2} wrap="nowrap" mt={1}>
                <Avatar
                  aria-label="author profile image"
                  size={isSmallerThanIp6 ? "xs" : "sm"}
                  name={article.author ? article.author.author_name : ""}
                  src={
                    article.author
                      ? `${process.env.API_URL}${article.author?.author_avatar?.url}`
                      : ""
                  }
                />
                <Box>
                  <Text
                    as="p"
                    fontSize={isSmallerThanIp6 ? "xs" : "sm"}
                    color={useColorModeValue("_black", "white")}
                  >
                    {article.author ? article.author.author_name : "Anon"}
                  </Text>
                </Box>
              </HStack>
              <Text
                color={useColorModeValue("_blue", "_green")}
                fontSize={isSmallerThanIp6 ? "xs" : "sm"}
                as="p"
              >
                {parseDate(article.published_at)}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Link>
    </motion.div>
  );
};

export default memo(SquareBlogCard);

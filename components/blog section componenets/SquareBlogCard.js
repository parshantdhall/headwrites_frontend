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
import calculateReadTime from "../../lib/calculateReadTime";

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

  const categoryColor = useColorModeValue("_blue", "_green");
  // Estimated readtime
  // console.dir(article);
  const ert = calculateReadTime(article?.content?.text);
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
      <Link href={`/${article.slug}`} passHref>
        <a>
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
                src={article?.featuredImage?.url}
                alt={
                  article?.featuredImage.altText
                    ? article?.featuredImage.altText
                    : ""
                }
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
              {/*----------- Category ----------*/}
              <HStack justifyContent="space-between" alignItems="center">
                <Text
                  as="h2"
                  fontSize={isSmallerThanIp6 ? "xs" : "sm"}
                  color={categoryColor}
                  fontFamily="quicksand"
                >
                  {article.category && article.category !== null
                    ? article.category.categoryName
                    : "Uncategorized"}
                </Text>

                {/* ----------Read Time----- */}
                <Text
                  as="h2"
                  fontSize={isSmallerThanIp6 ? "xs" : "sm"}
                  color={categoryColor}
                  fontFamily="quicksand"
                >
                  {`${ert.min}mins ${ert.sec} secs`}
                </Text>
              </HStack>
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
                {article.title}
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
                    name={article.author ? article.author.name : "Anon"}
                    src={article.author ? article.author?.picture : ""}
                  />
                  <Box>
                    <Text
                      as="p"
                      fontSize={isSmallerThanIp6 ? "xs" : "sm"}
                      color={useColorModeValue("_black", "white")}
                    >
                      {article.author ? article.author.name : "Anon"}
                    </Text>
                  </Box>
                </HStack>
                <Text
                  color={useColorModeValue("_blue", "_green")}
                  fontSize={isSmallerThanIp6 ? "xs" : "sm"}
                  as="p"
                >
                  {parseDate(article?.date)}
                </Text>
              </Flex>
            </Box>
          </Box>
        </a>
      </Link>
    </motion.div>
  );
};

export default memo(SquareBlogCard);

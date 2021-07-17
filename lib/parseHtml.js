import {
  Box,
  Code,
  Heading,
  Text,
  AspectRatio,
  useColorModeValue,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { shimmer, toBase64 } from "./imageLoading";

const parseHtml = (htmlContent) =>
  parse(htmlContent, {
    replace: (domeNode) => {
      if (domeNode.name === "p" && domeNode.children[0].name === "img") {
        //  replacing the image tag
        if (domeNode.children[0].attribs && domeNode.children[0].attribs.src) {
          return (
            <Box
              position="relative"
              w="auto"
              h="fit-content"
              maxW="650px"
              overflow="hidden"
              as="figure"
              my={2}
              borderRadius="lg"
            >
              <Image
                src={domeNode.children[0].attribs.src}
                layout="responsive"
                width={600}
                height={450}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                alt={
                  domeNode.children[0].attribs.alt
                    ? domeNode.children[0].attribs.alt
                    : ""
                }
              />
            </Box>
          );
        }
      }
      // ----------replacing link tag--------------
      const foundedAnchorTag =
        domeNode.name === "p" &&
        domeNode.children.findIndex(
          (child) => child.type === "tag" && child.name === "a"
        );

      if (foundedAnchorTag !== -1) {
        const txt =
          domeNode.children &&
          domeNode.children.map((child) => {
            if (child.type === "tag" && child.name === "a") {
              console.dir(child);
              return <Text>{child?.data}</Text>;
            }
          });
        return txt;
      }

      // replacing html tags with jsx
      switch (domeNode.name) {
        case "h1":
          return (
            <Heading as="h1" fontSize="3xl">
              {domeNode.children[0].data}
            </Heading>
          );
        case "h2":
          return (
            <Heading as="h2" fontSize="2xl">
              {domeNode.children[0].data}
            </Heading>
          );
        case "h3":
          return (
            <Heading as="h3" fontSize="xl">
              {domeNode.children[0].data}
            </Heading>
          );
        case "p":
          return <Text as="p">{domeNode.children[0].data}</Text>;
        case "blockquote":
          return (
            <Box
              borderLeft="4px solid "
              // bgColor={useColorModeValue("gray.200", "_black")}
              m={3}
              pl={2}
              py={2}
            >
              <Text as="blockquote">{domeNode.children[0].data}</Text>
            </Box>
          );
        case "pre":
          if (domeNode.attribs.class === "ql-syntax") {
            return <Code>{domeNode.children[0].data}</Code>;
          }
        case "iframe":
          return (
            <AspectRatio
              // width="80%"
              height="400px"
              minW="300px"
              maxW="650px"
              minH="350px"
              maxH="500px"
              ratio={1}
              my={2}
            >
              <iframe src={domeNode.attribs.src} />
            </AspectRatio>
          );
        default:
          break;
      }
    },
  });

export default parseHtml;

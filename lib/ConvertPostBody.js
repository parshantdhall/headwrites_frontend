import Image from "next/image";
import Link from "next/link";
import {
  Text,
  Box,
  Link as ChakraLink,
  Heading,
  Code,
  UnorderedList,
  OrderedList,
  ListItem,
  AspectRatio,
} from "@chakra-ui/layout";
import Icon from "@chakra-ui/icon";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { FaExternalLinkAlt } from "react-icons/fa";
import { shimmer, toBase64 } from "./imageLoading";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useMediaQuery } from "@chakra-ui/media-query";

const ConvertPostBody = ({ postcontent }) => {
  // grabbing children from the post content
  const { children } = postcontent;

  const blockQuoteColor = useColorModeValue("gray.200", "_black");
  const [isGreaterThan550] = useMediaQuery("(min-width: 550px)");
  const [isSmallerThanIp6] = useMediaQuery("(max-width: 350px)");

  // -----------ALL functions to create the DOM elements----------------
  const checkDirectText = (child) => {
    // checking if text is italics
    if ("italic" in child && child.italic === true) {
      return <Text as="em">{child.text}</Text>;
    }
    // checking if text is underlined

    if ("underline" in child && child.underline === true) {
      return <Text as="u">{child.text}</Text>;
    }
    // checking if text is code

    if ("code" in child && child.code === true) {
      return <Code>{child.text}</Code>;
    }
    return child.text;
  };
  // ---------Checking Link----------
  const checkIfLink = (child) => {
    return (
      <Link href={child?.href} passHref>
        <ChakraLink
          color="blue.400"
          textDecoration="underline"
          id={child.id ? child.id : ""}
          title={child.title ? child.title : "link"}
          target={
            child.openInNewTab !== undefined && child.openInNewTab === true
              ? "_blank"
              : "_self"
          }
        >
          {child.children.map((grandChild) => checkDirectText(grandChild))}{" "}
          {child.openInNewTab !== undefined && child.openInNewTab === true ? (
            <Icon as={FaExternalLinkAlt} w={4} h={4} />
          ) : (
            ""
          )}
        </ChakraLink>
      </Link>
    );
  };
  // -----------Checking Image-----------
  const checkIfImage = (child) => {
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
          src={child?.src}
          title={child?.title}
          layout="responsive"
          width={600}
          height={450}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
          alt={child.altText ? child.altText : "illustrative"}
        />
      </Box>
    );
  };
  // ----Checking BlockQuote------------
  const checkIfBlockQuote = (child) => {
    return (
      <Box
        borderLeft="4px solid "
        bgColor={blockQuoteColor}
        m={3}
        pl={2}
        py={2}
      >
        <Text as="blockquote">
          {child.children.map((grandChild) => checkDirectText(grandChild))}
        </Text>
      </Box>
    );
  };
  // ---------Checking Headings----
  const checkHeadings = (child, headingType) => {
    let headingSize;
    if (headingType === "h2") {
      headingSize = "2xl";
    }
    if (headingType === "h3") {
      headingSize = "xl";
    }
    return (
      <Heading as={headingType} fontSize={headingSize}>
        {child.children.map((grandChild) => checkDirectText(grandChild))}
      </Heading>
    );
  };

  // ------------Checking code block-----------
  const checkCodeBlock = (child) => {
    return (
      <Box
        m={2}
        w={isGreaterThan550 ? "100%" : isSmallerThanIp6 ? "270px" : "300px"}
      >
        {" "}
        <SyntaxHighlighter language="javascript" style={docco}>
          {child.children.map((grandChild) => checkDirectText(grandChild))}
        </SyntaxHighlighter>
      </Box>
    );
  };
  // ------------Checking unordered list-----------
  const unOrderedList = (child) => {
    return (
      <UnorderedList>
        {child.children.map((grandChild) => checkListItem(grandChild))}
      </UnorderedList>
    );
  };

  // ------------Checking ordered list-----------
  const orderedList = (child) => {
    return (
      <OrderedList>
        {child.children.map((grandChild) => checkListItem(grandChild))}
      </OrderedList>
    );
  };

  // -------------Checking for list item-----------
  const checkListItem = (child) => {
    if (child.type === "list-item") {
      return child.children.map((grandChild, i) => (
        <ListItem key={i} color="gray.500" ml={3}>
          {grandChild.children.map((item) => checkDirectText(item))}
        </ListItem>
      ));
    }
  };

  // ------------checking for embeded iFrames like youtube video---------
  const checkIframe = (child) => {
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
        <iframe src={child?.url} />
      </AspectRatio>
    );
  };
  // -----------------------Traversing through data-------------------
  const finalData = children.map((child, i) => {
    if (child.type === "paragraph") {
      return (
        <Text as="p" key={i}>
          {child.children.map((grandChild) => {
            // -----Direct text checking---
            if ("text" in grandChild) return checkDirectText(grandChild);

            // -----------Link checking----
            if (grandChild.type === "link") return checkIfLink(grandChild);
          })}
        </Text>
      );
    }

    // -------checking all other types--------
    switch (child.type) {
      case "image":
        return checkIfImage(child);
      case "block-quote":
        return checkIfBlockQuote(child);
      case "heading-two":
        return checkHeadings(child, "h2");
      case "heading-three":
        return checkHeadings(child, "h3");
      case "code-block":
        return checkCodeBlock(child);
      case "bulleted-list":
        return unOrderedList(child);
      case "numbered-list":
        return orderedList(child);
      case "iframe":
        return checkIframe(child);
    }
  });

  return [...finalData];
};

export default ConvertPostBody;

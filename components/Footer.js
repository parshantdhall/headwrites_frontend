import Link from "next/link";
import {
  Box,
  HStack,
  Image,
  Spacer,
  Text,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { useContext } from "react";
import { menuLinkContext } from "../lib/global state/context";
const Footer = () => {
  const copyRightYear = moment().format("yyyy");
  const [isGreaterThan900] = useMediaQuery("(min-width: 850px)");
  // ---Grabbing global state from context-----
  const globalState = useContext(menuLinkContext);
  const { menuLinkData } = globalState;

  return (
    <Box
      as="footer"
      role="context-info"
      p={3}
      mt={3}
      bgColor={useColorModeValue("white", "_black")}
      boxShadow="-1px -1px 4px rgba(0,0,0,.2)"
      width="100%"
      position="absolute"
      bottom={isGreaterThan900 ? "-150" : "-132"}
      sx={{
        /* These media queries are for the server side rendering
          becoz u cant use the usemediaquery hook at initial load
          */
        "@media screen and (min-width: 900px)": {
          bottom: "-150",
        },
      }}
      right="0"
    >
      {/* <Flex direction="row" justifyContent="space-around" alignItems="baseline"> */}
      <VStack alignItems="center" justifyContent="center" textAlign="center">
        <Box
          maxW={isGreaterThan900 ? "20%" : "40%"}
          sx={{
            /* These media queries are for the server side rendering
          becoz u cant use the usemediaquery hook at initial load
          */
            "@media screen and (min-width: 900px)": {
              maxW: "20%",
            },
          }}
          mb={3}
          cursor="pointer"
          margin="5px auto"
        >
          <Link href="/" passHref>
            <Image
              src={useColorModeValue("/logo.svg", "/logodark.svg")}
              alt="headwrites logo"
              minW="100%"
              minH="100%"
              w="100%"
            />
          </Link>
        </Box>

        <Box>
          <HStack spacing={4}>
            {/*---------Link---------  */}
            <Box role="link cotainer">
              <Link href="/">Home</Link>
            </Box>
            {/* All Other links */}
            {menuLinkData && menuLinkData.length > 0
              ? menuLinkData.map((page) => (
                  <Box role="link cotainer" key={page.id}>
                    <Link href={`/page/${page.slug}`}>{page.title}</Link>
                  </Box>
                ))
              : ""}
          </HStack>
        </Box>

        <Spacer />
        <Text as="p" color="_darkGrey" fontSize="xs">
          © {copyRightYear}-present Headwrites. All Rights Reserved.
        </Text>
      </VStack>
      {/* All Links */}
      {/* </Flex> */}
    </Box>
  );
};

export default Footer;

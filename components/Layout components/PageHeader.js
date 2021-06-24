import { Box, Flex, Image, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import ColorModeSwitch from "./ColorModeSwitch";
import SideDrawer from "./SideDrawer";

const PageHeader = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={(2, 3)}
      maxH="70px"
      overflow="hidden"
      as="header"
    >
      <Box>
        {/* Drawer */}
        <SideDrawer />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        overflow="hidden"
        alignItems="center"
      >
        <Box maxW="60%" cursor="pointer">
          <Link href="/">
            <a title="go to home page">
              <Image
                src={useColorModeValue("/logo.svg", "/logodark.svg")}
                alt="headwrites logo"
                minW="100%"
                minH="100%"
                w="100%"
              />
            </a>
          </Link>
        </Box>
      </Box>
      <Box>
        {/* chnage mode switch */}
        <ColorModeSwitch variant="ghost" size="lg" />
      </Box>
    </Flex>
  );
};

export default PageHeader;

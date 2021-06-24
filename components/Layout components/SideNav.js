import { Box, Divider, Spacer, useColorModeValue } from "@chakra-ui/react";
import SideBarBody from "./sidebar components/SideBarBody";
import SideBarFooter from "./sidebar components/SideBarFooter";
import SideBarHeader from "./sidebar components/SideBarHeader";

const SideNav = () => {
  return (
    <Box
      w="20%"
      bgColor={useColorModeValue("white", "_black")}
      boxShadow="lg"
      minH="100%"
      pos="fixed"
      left="0"
      top="0"
      zIndex="sticky"
      borderTopRightRadius="xl"
      as="nav"
      aria-label="Side navigation bar"
      role="side navigation"
    >
      <Box
        d="flex"
        flexDir="column"
        justifyContent="space-between"
        alignItems="center"
        height="100vh"
        width="full"
      >
        {/* -----Side bar header---- */}
        <Box p={3} mt={2}>
          <SideBarHeader />
        </Box>

        <Divider />
        {/* ---Side bar Body------- */}

        <Box flex="1" w="full">
          <SideBarBody />
        </Box>

        {/* sidebar footer */}
        <Spacer />
        <Box p={3}>
          <SideBarFooter />
        </Box>
      </Box>
    </Box>
  );
};

export default SideNav;

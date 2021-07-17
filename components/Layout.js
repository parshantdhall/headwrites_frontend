import { Box, useMediaQuery } from "@chakra-ui/react";

import PageHeader from "./Layout components/PageHeader";
import Grettings from "./Layout components/Grettings";
import SearchInput from "./searh and filter/SearchInput";
import SideNav from "./Layout components/SideNav";
import ColorModeSwitch from "./Layout components/ColorModeSwitch";
import Seo from "./Seo";
import Footer from "./Footer";

const Layout = ({ children, searchKeyword, setSearchKeyword }) => {
  // Using media queries
  const [isGreaterThan900] = useMediaQuery("(min-width: 850px)");
  return (
    <>
      <Seo />
      {isGreaterThan900 ? <SideNav /> : ""}

      <Box
        role="page container"
        width={isGreaterThan900 ? "80%" : "100%"}
        sx={{
          /* These media queries are for the server side rendering
          becoz u cant use the usemediaquery hook at initial load
          */
          "@media screen and (min-width: 900px)": {
            width: "80%",
          },
        }}
        ml="auto"
        mr="0"
      >
        <Box position="relative" minH="100vh">
          {isGreaterThan900 ? "" : <PageHeader />}
          <Box px={5} mt={5} maxW="100%" minW="100%">
            <Box
              display={isGreaterThan900 ? "flex" : "block"}
              pt={isGreaterThan900 ? 3 : ""}
              sx={{
                "@media screen and (min-width: 900px)": {
                  display: "flex",
                  paddingTop: "0.75rem",
                },
              }}
              justifyContent="space-between"
              alignItems="flex-end"
              flexWrap="nowrap"
            >
              <Grettings />
              <Box mt={4} flex="1" mx={{ md: 5 }}>
                <SearchInput
                  searchKeyword={searchKeyword}
                  setSearchKeyword={setSearchKeyword}
                />
              </Box>
              {isGreaterThan900 ? <ColorModeSwitch /> : ""}
            </Box>
          </Box>
          <Box as="main">{children}</Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Layout;

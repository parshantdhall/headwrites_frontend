import { ChakraProvider } from "@chakra-ui/react";
import HeadStuff from "../components/HeadStuff";
import { CustomTheme } from "../lib/ThemeConfig";

import "../styles/globals.css";
// swiper css file
import "swiper/swiper.min.css";
import MenuLinkProvider from "../lib/global state/MenuLinkProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={CustomTheme}>
      <HeadStuff />
      <MenuLinkProvider>
        <Component {...pageProps} />
      </MenuLinkProvider>
    </ChakraProvider>
  );
}

export default MyApp;

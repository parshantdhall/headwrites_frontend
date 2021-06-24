import { ChakraProvider } from "@chakra-ui/react";
import HeadStuff from "../components/HeadStuff";
import { CustomTheme } from "../lib/ThemeConfig";

import "../styles/globals.css";
// swiper css file
import "swiper/swiper.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={CustomTheme}>
      <HeadStuff />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

// This file is about customizing chakra theme acc to design
import { extendTheme } from "@chakra-ui/react";
// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// Configuring theme
export const CustomTheme = extendTheme({
  colors: {
    _black: "#2A363B",
    _blue: "#154042",
    _lightGrey: "#eeeeee",
    _darkGrey: "#a8a7a7",
    _green: "#99B898",
  },
  fonts: {
    quicksand: `'Quicksand', sans-serif`,
    Merriweather: `'Merriweather', serif`,
    Montserrat: `'Montserrat', sans-serif`,
  },
  config,
});

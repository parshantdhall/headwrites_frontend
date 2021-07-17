import { memo } from "react";
import {
  Box,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import useSound from "use-sound";

const ColorModeSwitch = ({ variant, size }) => {
  // Adding sound when cicked
  const soundUrl = "/sounds/rocker-switch.mp3";
  const [playSound] = useSound(soundUrl, { volume: 0.5 });
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <IconButton
        size={size}
        onClick={() => {
          playSound();
          toggleColorMode();
        }}
        aria-label="Toogle colour mode"
        color={useColorModeValue("_black", "orange.300")}
        variant={variant}
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        _focus={{
          outline: "none",
        }}
      ></IconButton>
    </Box>
  );
};

export default memo(ColorModeSwitch);

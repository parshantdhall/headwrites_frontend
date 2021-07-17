import { IconButton } from "@chakra-ui/react";
import { RiMenu5Line } from "react-icons/ri";
import useSound from "use-sound";

const OpenSideBarBtn = ({ onOpen }) => {
  // Adding sound when cicked
  const soundUrl = "/sounds/open-drawer.mp3";
  const [playSound] = useSound(soundUrl, { volume: 0.5 });
  return (
    <IconButton
      aria-label="Open side navigation button"
      variant="ghost"
      onClick={() => {
        playSound();
        onOpen();
      }}
      size="lg"
      icon={<RiMenu5Line />}
      _focus={{
        outline: "none",
      }}
    ></IconButton>
  );
};

export default OpenSideBarBtn;

import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [offSetY, setOffSetY] = useState(0);
  const handleScroll = () => setOffSetY(window && window.pageYOffset);

  useEffect(() => {
    window && window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window && window.scrollTo(0, 0);
  };
  console.dir(offSetY);
  return (
    <IconButton
      borderRadius="full"
      zIndex="sticky"
      position="fixed"
      transform={`translateX(${offSetY > 800 ? "0" : "200%"})`}
      right="10"
      bottom="70px"
      role="Scroll to top Button"
      aria-label="click to scroll to top"
      icon={<FaArrowUp />}
      colorScheme="teal"
      size="lg"
      onClick={handleScrollToTop}
    />
  );
};

export default ScrollToTop;

import { useMediaQuery } from "@chakra-ui/react";

const MediaQuery = (minWidth) => {
  const screenSize = useMediaQuery(minWidth);
  return screenSize;
};

export const moreThan900 = MediaQuery("min-width: 900px");

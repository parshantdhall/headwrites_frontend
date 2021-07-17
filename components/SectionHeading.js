import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

const SectionHeading = ({ headingText }) => {
  return (
    <Box>
      <Heading
        as="h2"
        fontSize="md"
        color={useColorModeValue("_black", "_lightGrey")}
        fontWeight="light"
        textTransform="uppercase"
      >
        {headingText}
      </Heading>
    </Box>
  );
};

export default SectionHeading;

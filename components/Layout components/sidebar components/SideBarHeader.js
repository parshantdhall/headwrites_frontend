import { VStack, Box, Image, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";

const SideBarHeader = () => {
  return (
    <Box>
      <VStack spacing="3">
        <Box maxW="75%" mb={3} cursor="pointer">
          <Link href="/">
            <a title="go to home page">
              <Image
                src={useColorModeValue("/logo.svg", "/logodark.svg")}
                alt="headwrites logo"
                minW="100%"
                minH="100%"
                w="100%"
              />
            </a>
          </Link>
        </Box>
        {/* <Box textAlign="center" mt={2}>
          <Text
            as="h2"
            fontWeight="bold"
            fontSize="md"
            fontFamily="Merriweather"
          >
            Writings assisting your daily life.
          </Text>
        </Box> */}
      </VStack>
    </Box>
  );
};

export default memo(SideBarHeader);

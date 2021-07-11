import {
  Icon,
  HStack,
  VStack,
  Text,
  Box,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

import { FiHome, FiUsers } from "react-icons/fi";
const SideBarBody = () => {
  return (
    <VStack spacing="30" w="full" my={4} px={3}>
      {/* Link */}
      <Link href="/" passHref>
        <HStack spacing="3" w="full" cursor="pointer">
          <Box
            px="8px"
            py="6px"
            bgColor={useColorModeValue("_blue", "green.300")}
            borderRadius="lg"
          >
            <Icon as={FiHome} color="white" w={5} h={5} />
          </Box>
          <Text
            as="p"
            fontWeight="bold"
            fontFamily="Quicksand"
            color={useColorModeValue("black", "white")}
          >
            Home
          </Text>
          <Spacer />
          <Box
            borderRadius="xl"
            h="2px"
            w="5rem"
            bgColor={useColorModeValue("_blue", "green.300")}
          ></Box>
        </HStack>
      </Link>

      <Link href="/about" passHref>
        <HStack spacing="3" w="full" cursor="pointer">
          <Box px="8px" py="6px" bgColor="_lightGrey" borderRadius="lg">
            <Icon as={FiUsers} color="_darkGrey" w={5} h={5} />
          </Box>
          <Text
            as="p"
            fontWeight="bold"
            fontFamily="Quicksand"
            color="_darkGrey"
          >
            About Us
          </Text>
          <Spacer />
          {/* <Box borderRadius="xl" h="2px" w="30px" bgColor="_blue"></Box> */}
        </HStack>
      </Link>
    </VStack>
  );
};

export default SideBarBody;

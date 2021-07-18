import router from "next/router";
import { useEffect, useState } from "react";
import {
  HStack,
  VStack,
  Text,
  Box,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

import gFetch from "../../../lib/gFetch";

const SideBarBody = () => {
  const [pageLinks, setPageLinks] = useState([]);
  const [currentSlug, setCurrentSlug] = useState("");
  const activeLinkCol = useColorModeValue("black", "white");
  const activeLinkBgCol = useColorModeValue("_blue", "green.300");
  // ---current location-----
  const currentLocation = router.query.pageSlug ? router.query.pageSlug : "/";

  // fetching all the links
  useEffect(() => {
    (async () => {
      const pageLinksDataQuery = `{
      pages{
        id
        title
        slug
      }
    }
    `;
      try {
        const { data } = await gFetch(pageLinksDataQuery);
        setPageLinks(data?.pages);
        setCurrentSlug(currentLocation);
      } catch (e) {
        console.dir(e);
      }
    })();
  }, [currentLocation]);

  return (
    <VStack spacing="30" w="full" my={4} px={3}>
      {/* -----Home------- */}
      <Link href="/" passHref>
        <HStack spacing="3" w="full" cursor="pointer">
          {/* <Box
            px="8px"
            py="6px"
            bgColor={useColorModeValue("_blue", "green.300")}
            borderRadius="lg"
          >
            <Icon as={FiHome} color="white" w={5} h={5} />
          </Box> */}

          <Text
            as="p"
            fontWeight="bold"
            fontFamily="Quicksand"
            color={currentSlug === "/" ? activeLinkCol : "_darkGrey"}
          >
            Home
          </Text>
          <Spacer />
          {/* --active link bar-- */}
          {currentSlug === "/" ? (
            <Box
              borderRadius="xl"
              h="2px"
              w="5rem"
              bgColor={activeLinkBgCol}
            ></Box>
          ) : (
            ""
          )}
        </HStack>
      </Link>

      {/* All Other pages */}
      {pageLinks && pageLinks.length > 0
        ? pageLinks.map((page) => (
            <Link href={`/page/${page.slug}`} key={page.id} passHref>
              <HStack spacing="3" w="full" cursor="pointer">
                <Text
                  as="p"
                  fontWeight="bold"
                  fontFamily="Quicksand"
                  color={
                    currentSlug === page.slug ? activeLinkCol : "_darkGrey"
                  }
                >
                  {page.title}
                </Text>
                <Spacer />
                {/* --active link bar-- */}
                {currentSlug === page.slug ? (
                  <Box
                    borderRadius="xl"
                    h="2px"
                    w="5rem"
                    bgColor={activeLinkBgCol}
                  ></Box>
                ) : (
                  ""
                )}
              </HStack>
            </Link>
          ))
        : ""}
    </VStack>
  );
};

export default SideBarBody;

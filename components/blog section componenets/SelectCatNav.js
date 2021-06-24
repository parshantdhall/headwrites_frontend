import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, useColorModeValue } from "@chakra-ui/react";

const SelectCatNav = ({ catName, catSlug }) => {
  const router = useRouter();
  const currentLocation = router.query.catSlug;
  // const isActive = String(currentLocation) == String(catSlug);

  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (String(currentLocation) === String(catSlug)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [currentLocation, catSlug]);

  // This will recieve data
  return (
    <Box>
      {/* Here it will check if the category sulg is provided or not
      and if not it will go to all category */}
      <Link href={catSlug ? `/category/${catSlug}` : "/"} scroll={false}>
        <a title={`Go to ${catName} related blogs page`}>
          <Button
            bg={!isActive ? useColorModeValue("white", "_black") : "_blue"}
            color={!isActive ? "_green" : "white"}
            fontWeight="light"
            size="sm"
            rounded={15}
            textAlign="center"
            boxShadow="base"
            m={1}
            my={3}
            _hover={{
              backgroundColor: isActive ? "none" : "gray.200",
            }}
            _focus={{
              outline: "none",
            }}
          >
            {catName}
          </Button>
        </a>
      </Link>
    </Box>
  );
};

export default memo(SelectCatNav);

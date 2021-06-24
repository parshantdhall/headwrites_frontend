import { Box, HStack, Icon, Link as ChakraLink } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import gFetch from "../../../lib/gFetch";

const SideBarFooter = () => {
  const [socialMediaData, setSocialMediaData] = useState([]);

  useEffect(() => {
    (async () => {
      const socialMediaDataQuery = `{
      socialMedias{
        social_media_platform,
        social_link
  }
}
    `;
      try {
        const { data } = await gFetch(socialMediaDataQuery);
        setSocialMediaData(data.socialMedias);
      } catch (e) {
        console.dir(e);
      }
    })();
  }, [""]);

  const findSocialLink = (platformName) => {
    const foundItem = socialMediaData.find(
      (item) => item.social_media_platform === platformName
    );
    if (foundItem) {
      return foundItem.social_link;
    }
    return "/";
  };

  return (
    <Box w="full">
      <HStack
        spacing="6"
        p={2}
        px={3}
        boxShadow="base"
        borderRadius="xl"
        w="fit-content"
        margin="0 auto"
      >
        <Box>
          <ChakraLink
            href={findSocialLink("Facebook")}
            target="_blank"
            title="Go to Headwrites facebook page"
          >
            <Icon
              aria-label="Headwrites facebook page"
              as={FaFacebook}
              w={8}
              h={8}
              color="blue.600"
            />
          </ChakraLink>
        </Box>
        <Box>
          <ChakraLink
            href={findSocialLink("Instagram")}
            target="_blank"
            title="Go to Headwrites Instagram page"
          >
            <Icon
              aria-label="Headwrites Instagram page"
              as={FaInstagram}
              w={8}
              h={8}
              color="red.400"
            />
          </ChakraLink>
        </Box>
        <Box>
          <ChakraLink
            href={findSocialLink("Twitter")}
            target="_blank"
            title="Go to Headwrites Twitter page"
          >
            <Icon
              aria-label="Headwrites Twitter page"
              as={FaTwitter}
              w={8}
              h={8}
              color="blue.400"
            />
          </ChakraLink>
        </Box>
        <Box>
          <ChakraLink
            href={findSocialLink("Pinterest")}
            target="_blank"
            title="Go to Headwrites Pinterest page"
          >
            <Icon
              aria-label="Headwrites Pinterest page"
              as={FaPinterest}
              w={8}
              h={8}
              color="red.600"
            />
          </ChakraLink>
        </Box>
      </HStack>
    </Box>
  );
};

export default memo(SideBarFooter);

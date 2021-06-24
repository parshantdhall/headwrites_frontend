import { HStack, Icon, useClipboard, useToast } from "@chakra-ui/react";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import {
  FaClipboard,
  FaEnvelope,
  FaFacebook,
  FaPinterest,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
const SocialShareBlock = ({ title, url, featuredImage }) => {
  const mainUrl = "http://localhost:3000";
  const { hasCopied, onCopy } = useClipboard(mainUrl + url);
  const toast = useToast();

  if (hasCopied) {
    toast({
      title: "Link Copied!",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }

  return (
    <HStack spacing={5} justifyContent="space-evenly">
      <EmailShareButton
        subject={"Shared Headwrites Article"}
        body={title}
        url={`${mainUrl}${url}`}
      >
        <Icon
          as={FaEnvelope}
          role="share article via email"
          aria-label="Share to Email Button"
          w={7}
          h={7}
          color="gray.600"
        />
      </EmailShareButton>
      <FacebookShareButton url={`${mainUrl}${url}`} hashtag="#headwrites">
        <Icon
          as={FaFacebook}
          role="share article at Facebook"
          aria-label="Share to Facebook Button"
          w={7}
          h={7}
          color="blue.400"
        />
      </FacebookShareButton>
      <PinterestShareButton
        url={`${mainUrl}${url}`}
        media={process.env.API_URL + featuredImage}
        description={title}
      >
        <Icon
          as={FaPinterest}
          role="share article at Pinterest"
          aria-label="Share to Pinterest Button"
          w={7}
          h={7}
          color="red.400"
        />
      </PinterestShareButton>
      <WhatsappShareButton url={`${mainUrl}${url}`}>
        <Icon
          as={FaWhatsapp}
          role="share article at Whatsapp"
          aria-label="Share to Whatsapp button"
          w={7}
          h={7}
          color="green.400"
        />
      </WhatsappShareButton>
      <TwitterShareButton
        url={`${mainUrl}${url}`}
        title={title}
        hashtags={["headwrites"]}
      >
        <Icon
          as={FaTwitter}
          role="share article at Twitter"
          aria-label="Share to Twitter Button"
          w={7}
          h={7}
          color="cyan.400"
        />
      </TwitterShareButton>

      <Icon
        as={FaClipboard}
        role="Copy Link"
        aria-label="Copy Link"
        w={7}
        h={7}
        color="orange.400"
        cursor="pointer"
        onClick={onCopy}
      />
    </HStack>
  );
};

export default SocialShareBlock;

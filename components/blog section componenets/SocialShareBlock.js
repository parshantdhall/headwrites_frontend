import { HStack, Icon, useClipboard, useToast } from "@chakra-ui/react";
import {
  LinkedinShareButton,
  FacebookShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  RedditShareButton,
} from "react-share";
import {
  FaClipboard,
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaPinterest,
  FaReddit,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
const SocialShareBlock = ({ title, url, featuredImage, description }) => {
  const mainUrl = "https://headwrites.com";
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
  const width = 6;
  const height = 6;
  return (
    <HStack spacing={5} justifyContent="space-evenly">
      <LinkedinShareButton
        source="Headwrites.com"
        title={title}
        url={`${mainUrl}${url}`}
        summary={description}
      >
        <Icon
          as={FaLinkedin}
          role="share article via LinkedIn"
          aria-label="Share to LinkedIn Button"
          w={width}
          h={height}
          color="blue.600"
        />
      </LinkedinShareButton>
      <FacebookShareButton url={`${mainUrl}${url}`} hashtag="#headwrites.com">
        <Icon
          as={FaFacebook}
          role="share article at Facebook"
          aria-label="Share to Facebook Button"
          w={width}
          h={height}
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
          w={width}
          h={height}
          color="red.400"
        />
      </PinterestShareButton>
      <WhatsappShareButton url={`${mainUrl}${url}`}>
        <Icon
          as={FaWhatsapp}
          role="share article at Whatsapp"
          aria-label="Share to Whatsapp button"
          w={width}
          h={height}
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
          w={width}
          h={height}
          color="cyan.400"
        />
      </TwitterShareButton>
      <RedditShareButton url={`${mainUrl}${url}`} title={title}>
        <Icon
          as={FaReddit}
          role="share article at Reddit"
          aria-label="Share to Reddit Button"
          w={width}
          h={height}
          color="orange.400"
        />
      </RedditShareButton>
      <Icon
        as={FaClipboard}
        role="Copy Link"
        aria-label="Copy Link"
        w={width}
        h={height}
        color="red.400"
        cursor="pointer"
        onClick={onCopy}
      />
    </HStack>
  );
};

export default SocialShareBlock;

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { Box, Container, IconButton, Flex } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

const SingleStoryPage = () => {
  const ReactStories = dynamic((props) => import("react-insta-stories"), {
    ssr: false,
  });
  const stories = [
    {
      url:
        "https://images.unsplash.com/photo-1615319532762-b4ccc69e5abf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
      header: {
        heading: "first Story",
      },
    },
    {
      url:
        "https://images.unsplash.com/photo-1615307255772-16b37528023a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
      header: {
        heading: "Second Story",
      },
    },
    {
      url:
        "https://images.unsplash.com/photo-1523215108660-3fdf7932d7a5?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      header: {
        heading: "Third Story",
      },
    },
  ];
  const router = useRouter();

  return (
    <Box w="100%" h="100vh" bgColor="orange.200">
      <Container>
        {/* Story Page Header */}
        <Box as="header" role="story header">
          <Flex justifyContent="space-between">
            <IconButton
              aria-label="Back button"
              icon={<FaArrowLeft />}
              variant="ghost"
              onClick={router.back}
              _hover={{
                background: "none",
              }}
            />
          </Flex>
        </Box>
        <Box role="story body">
          <Box w="100%" h="100%">
            <Box w="80%" mx="auto">
              <ReactStories
                stories={stories}
                width={333}
                height={550}
                defaultInterval={15000}
                storyStyles={{
                  minWidth: "100%",
                  minHeight: "100%",
                }}
                loop
                //  onStoryEnd={router.back}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SingleStoryPage;

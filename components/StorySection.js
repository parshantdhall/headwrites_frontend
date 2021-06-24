import dynamic from "next/dynamic";
import { Stack, HStack, Icon } from "@chakra-ui/react";
import { RiGhostLine } from "react-icons/ri";
import SectionHeading from "./SectionHeading";
import StoryButton from "./StoryButton";

const StorySection = () => {
  return (
    <Stack as="section" aria-label="Stories Section" spacing="10px">
      {/* Section Heading */}
      <HStack>
        <SectionHeading headingText="Stories" />
        <Icon as={RiGhostLine} color="_green" boxSize="1.3em" />
      </HStack>
      <HStack
        spacing="5px"
        py={3}
        width="100%"
        overflowX="scroll"
        className="catContainer"
      >
        <StoryButton />
      </HStack>
    </Stack>
  );
};

export default StorySection;

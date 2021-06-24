import { Button } from "@chakra-ui/react";
import Link from "next/link";
const StoryButton = () => {
  return (
    <Link href="/story/123">
      <Button>Open story</Button>
    </Link>
  );
};

export default StoryButton;

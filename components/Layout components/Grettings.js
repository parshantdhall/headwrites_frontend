import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import moment from "moment";

const Grettings = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    //   Setting date
    const date = moment().format("dddd, Do MMMM YYYY");
    setCurrentDate(date);
    // Setting grreting acc to current time
    const currentHour = +moment().hour();

    let greet = "";
    if (currentHour >= 5 && currentHour < 12) {
      greet = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greet = "Good Afternoon";
    } else {
      greet = "Good Evening";
    }

    setGreeting(greet);
  }, []);

  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Box>
        <Text
          as="p"
          aria-label="Today's date"
          fontSize={{ base: "xs", md: "sm" }}
          color={useColorModeValue("_darkGrey", "_lightGrey")}
          fontFamily="quicksand"
        >
          {currentDate}
        </Text>
      </Box>
      <Box>
        <Heading
          as="p"
          aria-label="Greetings"
          fontSize={{ base: "2xl", lg: "3xl" }}
          color={useColorModeValue("_black", "_green")}
          fontFamily="quicksand"
        >
          {greeting}
        </Heading>{" "}
      </Box>
    </Flex>
  );
};

export default Grettings;

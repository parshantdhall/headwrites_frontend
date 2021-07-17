import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ searchKeyword, setSearchKeyword }) => {
  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Placeholder and icon color
  const textColor = useColorModeValue("_blue", "_lightGrey");
  return (
    <Box maxWidth="60em" minW="100%" margin="auto" color={textColor}>
      <form onSubmit={(e) => e.preventDefault()}>
        <InputGroup>
          <Input
            type="text"
            value={searchKeyword}
            placeholder="Search Blog.."
            aria-label="Search input"
            onChange={handleChange}
            border="none"
            boxShadow="base"
            bgColor={useColorModeValue("white", "_black")}
            _placeholder={{
              color: "gray.300",
            }}
          />
          <InputLeftElement pointerEvents="none">
            <FaSearch />
          </InputLeftElement>{" "}
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchInput;

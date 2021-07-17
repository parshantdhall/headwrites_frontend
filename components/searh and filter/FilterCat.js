import {
  IconButton,
  useDisclosure,
  Button,
  Modal,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
} from "@chakra-ui/react";
import { FaSlidersH } from "react-icons/fa";

const FilterCat = () => {
  // NOTE: Make sure to get data to filter from search input

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        icon={<FaSlidersH />}
        aria-label="Filter category button"
        size="sm"
        onClick={onOpen}
        _focus={{
          outline: "none",
        }}
      />
      {/* Category filter Modal */}
      <Box>
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent mx="10px">
            <ModalHeader>Filter categories</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>BLah BLah</p>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default FilterCat;

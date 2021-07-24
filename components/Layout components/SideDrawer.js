import {
  Drawer,
  useDisclosure,
  DrawerContent,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  // useBreakpointValue,
} from "@chakra-ui/react";
import OpenSideBarBtn from "./sidebar components/OpenSideBarBtn";
import SideBarBody from "./sidebar components/SideBarBody";
import SideBarFooter from "./sidebar components/SideBarFooter";
import SideBarHeader from "./sidebar components/SideBarHeader";

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const breakPointVar = useBreakpointValue({

  // })

  return (
    <>
      {/* Ham Btn */}
      <OpenSideBarBtn onOpen={onOpen} />
      {/* Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent borderRadius="0 7px 7px 0">
            <DrawerCloseButton />
            <DrawerHeader>
              <SideBarHeader />
            </DrawerHeader>
            <DrawerBody>
              <SideBarBody closeDrawer={onClose} />
            </DrawerBody>
            <DrawerFooter>
              <SideBarFooter />
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideDrawer;

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { FirebaseApp } from "firebase/app";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
  app?: FirebaseApp;
  signedIn?: boolean;
};

const Layout = ({
  children,
  title = "This is the default title",
  signedIn = false,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex flexDirection={"column"} alignContent={"stretch"}>
        <Flex justifyContent={"space-between"}>
          <Spacer></Spacer>
          <Button onClick={onOpen}>キーワード</Button>
          <Drawer isOpen={isOpen} placement={"right"} onClose={onClose}>
            <DrawerOverlay></DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton></DrawerCloseButton>
              <DrawerBody>
                <div>qqq</div>
                {signedIn && (
                  <Button
                    onClick={() => {
                      onClose();
                      modalOnOpen();
                    }}
                  >
                    {" + "}
                  </Button>
                )}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <Modal isOpen={modalIsOpen} onClose={modalOnClose}>
            <ModalOverlay></ModalOverlay>
            <ModalContent>
              <ModalBody>
                <div>add keyword</div>
              </ModalBody>
              <ModalFooter justifyContent={"space-between"}>
                <Button onClick={modalOnClose}>キャンセル</Button>
                <Button>登録する</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
        {children}
      </Flex>
      <footer>
        <hr />
        <span>(c) 2022 viewpointics-tan</span>
      </footer>
    </div>
  );
};

export default Layout;

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
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
import { getAuth, signOut } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import Head from "next/head";
import SignInButton from "../components/SIgnInButton";
import { useState } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
  app?: FirebaseApp;
};

const Layout = ({
  children,
  title = "This is the default title",
  app,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();
  const [signedIn, setSignedIn] = useState(false);

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
                {signedIn ? (
                  <Button
                    onClick={() => {
                      onClose();
                      modalOnOpen();
                    }}
                  >
                    {" + "}
                  </Button>
                ) : (
                  <SignInButton app={app}></SignInButton>
                )}
              </DrawerBody>
              <DrawerFooter>
                {signedIn && (
                  <Button onClick={() => signOut(getAuth(app))}>
                    ログアウト
                  </Button>
                )}
              </DrawerFooter>
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

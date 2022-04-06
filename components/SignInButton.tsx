import { Button, Flex, Input } from "@chakra-ui/react";
import {
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import { useState } from "react";

const SigninButton = ({
  app,
  setSignedIn,
}: {
  app?: FirebaseApp;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState("");
  const auth = getAuth(app);

  return (
    <Flex direction={"column"}>
      {!isSignInWithEmailLink(auth, window.location.href) ? (
        <>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email"
          ></Input>
          <Button
            onClick={() => {
              sendSignInLinkToEmail(auth, email, {
                handleCodeInApp: true,
                url: "http://localhost:3000",
              })
                .then(() => {
                  alert(
                    "メールを送信しました。メール中のリンクを確認してください。"
                  );
                })
                .catch((reason) => {
                  console.log(reason);
                });
            }}
          >
            メールを送信する
          </Button>
        </>
      ) : (
        <>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email"
          ></Input>
          <Button
            onClick={() => {
              signInWithEmailLink(auth, email, window.location.href)
                .then(async (result) => {
                  setSignedIn(true)
                  // await result.user.reload();
                  // await auth.currentUser?.reload();
                  // UIの修正が必要
                })
                .catch(() => {
                  setSignedIn(false);
                });
            }}
          >
            メールを確認する
          </Button>
        </>
      )}
    </Flex>
  );
};

export default SigninButton;

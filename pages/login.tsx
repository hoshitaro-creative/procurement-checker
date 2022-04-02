import { Button, Flex, Input } from "@chakra-ui/react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import { useState } from "react";

const Login = ({
  app,
  signedIn = false,
}: {
  app: FirebaseApp;
  signedIn: boolean;
}) => {
  const [email, setEmail] = useState<string>("");
  return (
    <Flex>
      {signedIn ? (
        <div>ログインしています</div>
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
              sendSignInLinkToEmail(getAuth(app), email, { url: "/" });
            }}
          >
            ログイン用のリンクを送信する
          </Button>
        </>
      )}
    </Flex>
  );
};

export default Login;

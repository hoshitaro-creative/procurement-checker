import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import {
  FirebaseAppProvider,
  AuthProvider,
  FirestoreProvider,
} from "reactfire";
import { firebaseConfig } from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import { useEffect, useState } from "react";

const app = initializeApp(firebaseConfig);
const MyApp = ({
  Component,
  pageProps,
}: AppProps): JSX.Element => {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    getAuth(app).onAuthStateChanged((user) => {
      setSignedIn(!!user);
    });
  }, );
  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={getAuth(app)}>
        <FirestoreProvider sdk={getFirestore(app)}>
          <ChakraProvider>
            <Component {...pageProps} app={app} signedIn={signedIn} />
          </ChakraProvider>
        </FirestoreProvider>
      </AuthProvider>
    </FirebaseAppProvider>
  );
};

export default MyApp;
